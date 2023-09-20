require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var possibleAccounts = {};
var globalState = {};
var gameSettingsObj;

const io = socketIO(server);
io.on('connection', (socket) => {
    // console.log('client connected on websocket');



    let userBEI = {
        "guest": true,
        "id": null,
        "roomLabel": null,
        "loggedIn": false,
        "accountUsername": null
    };

    socket.emit('userConnects');

    socket.on('confirmedUserConnects', (id) => {
        userBEI.id = id;
    })

    socket.on('userCreatesAccount', (createdAccount) => {
        possibleAccounts[createdAccount.chosenUN] = {username: createdAccount.chosenUN, password: createdAccount.chosenP, idHolder: userBEI.id, pendingAlerts: [], friendRequests: [], friendsList: [], groups: {}, groupNames: []}
        socket.emit('userAccountValid');
    })

    socket.on('userLogsIn', (loggedInAccount) => {
        if (possibleAccounts[loggedInAccount.username]) {
            if (loggedInAccount.password === possibleAccounts[loggedInAccount.username].password) {
                possibleAccounts[loggedInAccount.username].idHolder = userBEI.id;
                userBEI.accountUsername = loggedInAccount.username
                socket.emit('logInSuccessful', possibleAccounts[loggedInAccount.username])
            }
        }
        // console.log(possibleAccounts)
    })

    socket.on('grabbingUserInfoForProfilePage', () => {
        socket.emit('sendingBackUserForProfilePage', possibleAccounts[userBEI.accountUsername])
    })

    socket.on('newGame', (rS, ante, timer, progressiveBlinds, gameStyle, bbMinRange, bbMaxRange, chipUnits) => {
        var roomName
        if (rS === 0 && ante === 0) {
            console.log('hi');
        } else if (rS != 0 && ante != 0) {

            roomName = makeId(5);

            socket.join(roomName);

            userBEI['roomLabel'] = roomName;

            gameSettingsObj = {};

            gameSettingsObj['players'] = [];

            gameSettingsObj['idHolder'] = roomName;

            gameSettingsObj['pNickNames'] = [];

            gameSettingsObj['pChips'] = [];

            gameSettingsObj['gameStarted'] = false;

            gameSettingsObj['currentRoomSize'] = 1;

            gameSettingsObj['gameStarted'] = false;

            gameSettingsObj['updatedPChips'] = [];

            gameSettingsObj['desiredRoomSize'] = rS;

            gameSettingsObj['ante'] = ante;

            gameSettingsObj['timer'] = timer;

            gameSettingsObj['gameStyle'] = gameStyle

            gameSettingsObj['progressiveBlinds'] = progressiveBlinds;

            gameSettingsObj['minBuyIn'] = (bbMinRange * ante);

            gameSettingsObj['maxBuyIn'] = (bbMaxRange * ante);

            gameSettingsObj['chipUnits'] = chipUnits;

            gameSettingsObj['playerObjects'] = {};

            globalState[roomName.toString()] = gameSettingsObj;

            socket.emit('gameStateCreated');

        }

        console.log(globalState);

    })

    socket.on('playerEntersGameCode', (gameCode) => {
        if (globalState[gameCode]) {
            userBEI.roomLabel = gameCode;
            socket.join(gameCode)
            socket.emit('userIsClearedToJoinGame')
        }
    })

    socket.on('playerSubmitsInGameDisplayInfo', (displayObj) => {
        if (globalState[userBEI.roomLabel]) {
            globalState[userBEI.roomLabel].pNickNames.push(displayObj.enteredDisplayName)
            globalState[userBEI.roomLabel].pChips.push(Number(displayObj.enteredDisplayBuyIn))
            globalState[userBEI.roomLabel].players.push(userBEI.id)

            for (let i = 0; i < globalState[userBEI.roomLabel].pNickNames.length; i++) {
                if (displayObj.enteredDisplayName === globalState[userBEI.roomLabel].pNickNames[i]) {
                    globalState[userBEI.roomLabel].playerObjects[i + 1] = {'displayName': globalState[userBEI.roomLabel].pNickNames[i], 'chipCount': globalState[userBEI.roomLabel].pChips[i], 'inGameTurn': i + 1}
                }
            }

            console.log(globalState[userBEI.roomLabel]);

            io.to(userBEI.roomLabel).emit('sendingUserToGamePage', userBEI.roomLabel, globalState[userBEI.roomLabel]);
        }
    })

    socket.on('playerChecks', () => {
        console.log('player checks');
        io.to(userBEI.roomLabel).emit('sendingBackPlayerCheck')
    })

    socket.on('bounds', (bounds) => {
        console.log(bounds)
    })

    socket.on('initGameStarted', (info, info2) => {
        io.to(userBEI.roomLabel).emit('sendingBackGameStart', info)
    })

    socket.on('currentRoundHasJustEnded', () => {
        // io.to(userBEI.roomLabel).emit('sendingBackSubmittedWinnerOfRound');
        io.to(userBEI.roomLabel).emit('signlaingEndOfCurrentRound');
    })

    socket.on('roundIsOver', () => {
        io.to(userBEI.roomLabel).emit('sendingBackSubmittedWinnerOfRound');
    })

    socket.on('nextRoundInitiated', () => {
        io.to(userBEI.roomLabel).emit('displayingNextRoundInitiation');
    })


    //////////////////////////////////////////////////////////////////

    socket.on('userSendsFriendRequest', (friendUsername) => {
        if (possibleAccounts[friendUsername]) {
            possibleAccounts[friendUsername].pendingAlerts.push({'type': 'friend_request', 'sender': userBEI.accountUsername});
            possibleAccounts[friendUsername].friendRequests.push(userBEI.accountUsername);
            io.to(possibleAccounts[friendUsername].idHolder).emit('sendingFriendRequestToReciever', userBEI.accountUsername)
            socket.emit('friendRequestCleared');
        } else {
            socket.emit('friendRequestFailed');
        }
    })

    socket.on('requestAccepted', (type, username, index) => {
        possibleAccounts[userBEI.accountUsername].friendsList.push(username)
        possibleAccounts[username].friendsList.push(userBEI.accountUsername);
        socket.emit('requestAcceptedConfirmed', username, index);
        io.to(possibleAccounts[username].idHolder).emit('userAcceptedFriendRequest', userBEI.accountUsername);
    })

    socket.on('groupCreated', (groupName) => {
        if (possibleAccounts[userBEI.accountUsername]) {
            possibleAccounts[userBEI.accountUsername].groups[groupName] = {'host': userBEI.accountUsername, members: [userBEI.accountUsername], name: groupName, totalMembers: 1}
            possibleAccounts[userBEI.accountUsername].groupNames.push(groupName);
            socket.emit('groupCreationCleared', possibleAccounts[userBEI.accountUsername].groups[groupName]); 
        }
    })

    socket.on('GroupInviteSent', (username, groupName) => {
        if (possibleAccounts[username]) {
            possibleAccounts[username].pendingAlerts.push({'type': 'group_invite', 'sender': userBEI.accountUsername, 'groupName': groupName})
            io.to(possibleAccounts[username].idHolder).emit('sendingGroupInvite', userBEI.accountUsername, groupName);
            socket.emit('GroupInviteConfirmed');
            
        } else {
            socket.emit('GroupInviteFailed');
        }
    })

    socket.on('groupInviteAccepted', (sender, groupName, index) => {
        possibleAccounts[sender].groups[groupName].members.push(userBEI.accountUsername);
        possibleAccounts[sender].groups[groupName].totalMembers++;
        possibleAccounts[userBEI.accountUsername].groups[groupName] = possibleAccounts[sender].groups[groupName];

        console.log(possibleAccounts[userBEI.accountUsername].groups[groupName]);

        io.to(possibleAccounts[sender].idHolder).emit('groupInviteHasBeenAccepted', possibleAccounts[userBEI.accountUsername].groups[groupName])
        socket.emit('sendingGroupInfo', possibleAccounts[userBEI.accountUsername].groups[groupName], index)

    })

    socket.on('grabbingAnyPendingAlerts', () => {
        socket.emit('sendingBackAnyPendingAlerts', possibleAccounts[userBEI.accountUsername].friendRequests)
    })

    socket.on('requestDeclined', (type, index) => {
        socket.emit('sendingBackRequestDecline', type, index)
    })

    //////////////////////////////////////////////////////////////////

    socket.on('currentRoundHasEnded', () => {
        io.to(userBEI.roomLabel).emit('sendingBackCurrentRoundEnder');
    })

    // PLAYER IN GAME LISTENERS //

    socket.on('pSubmitsBet', (turn, betAmount, playerChips) => {
        io.to(userBEI.roomLabel).emit('playerSubmitsBet', turn, betAmount, playerChips)
    })

    socket.on('pCallsBet', (turn, callAmount, playerChips) => {
        io.to(userBEI.roomLabel).emit('playerCallsBet', turn, callAmount, playerChips);
    })

    socket.on('pFolds', (turn) => {
        io.to(userBEI.roomLabel).emit('playerFolds', turn)
    })

    socket.on('pChecks', (turn) => {
        io.to(userBEI.roomLabel).emit('playerChecks', turn)
    })

    socket.on('WinnerHasBeenChosen', (winner) => {
        console.log(winner);
        io.to(userBEI.roomLabel).emit('sendingBackWinnerOfRound', winner)
    })

    socket.on('initNextRound', () => {
        io.to(userBEI.roomLabel).emit('sendingBackInitNextRound');
    })

    ///////// P1 /////////
    socket.on('p1SubmitsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP1Bet', chips)
    })

    socket.on('p1Checks', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP1Check');
    })

    socket.on('p1CallsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP1CalledBet', chips)
    })

    socket.on('p1Folds', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP1Fold');
    })

    ///////// P2 /////////
    socket.on('p2SubmitsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP2Bet', chips)
    })

    socket.on('p2Checks', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP2Check');
    })

    socket.on('p2CallsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP2CalledBet', chips)
    })

    socket.on('p2Folds', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP2Fold');
    })

    ///////// P3 /////////
    socket.on('p3SubmitsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP3Bet', chips)
    })

    socket.on('p3Checks', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP3Check');
    })

    socket.on('p3CallsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP3CalledBet', chips)
    })

    socket.on('p3Folds', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP3Fold');
    })

    ///////// P4 /////////
    socket.on('p4SubmitsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP4Bet', chips)
    })

    socket.on('p4Checks', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP4Check');
    })

    socket.on('p4CallsBet', (chips) => {
        io.to(userBEI.roomLabel).emit('sendingBackP4CalledBet', chips)
    })

    socket.on('p4Folds', () => {
        io.to(userBEI.roomLabel).emit('sendingBackP4Fold');
    })
    

    // setInterval(() => {
    //     io.emit('ping', { data: (new Date()) / 1 });
    // }, 1000);
});



server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));