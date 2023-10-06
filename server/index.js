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

    let userBEI = {
        "guest": true,
        "id": null,
        "roomLabel": null,
        "loggedIn": false,
        "accountUsername": null,
        "caUsernameHolder": null
    };

    //////////////////////////////////////////////////////////////////

    ////// USER CONNECTING LISTENERS ////// 

    socket.emit('userConnects');

    socket.on('confirmedUserConnects', (id) => {
        userBEI.id = id;
    })

    //////////////////////////////////////////////////////////////////

    ////// USER CREATE ACCOUNT / LOG In LISTENERS //////

    socket.on('userCreatesAccount', (createdAccount) => {
        if (!possibleAccounts[createdAccount.chosenUN]) {
            userBEI.caUsernameHolder = createdAccount.chosenUN;
            possibleAccounts[createdAccount.chosenUN] = {username: createdAccount.chosenUN, password: createdAccount.chosenP, idHolder: userBEI.id, pendingAlerts: [], friendRequests: [], friendsList: [], groups: {}, groupNames: [], loggedIn: false, email: null, profileOptions:  {'useUsername': 'No', 'usePreSetChips': 'No', 'preSetChipAmount': 0}}
            socket.emit('userAccountValid');
        } else {
            socket.emit('userAccountInvalid')
        }
    })

    socket.on('userLogsIn', (loggedInAccount) => {

        if (possibleAccounts[loggedInAccount.username]) {
            if (loggedInAccount.password === possibleAccounts[loggedInAccount.username].password) {
                possibleAccounts[loggedInAccount.username].idHolder = userBEI.id;
                possibleAccounts[loggedInAccount.username].loggedIn = true;
                userBEI.accountUsername = loggedInAccount.username
                socket.emit('logInSuccessful', possibleAccounts[loggedInAccount.username])
            } else {
                socket.emit('logInFailed')
            }
        } else {
            socket.emit('logInFailed')
        }
    }) 

    socket.on('userConfirmsSignOut', () => {
        possibleAccounts[userBEI.accountUsername].loggedIn = false;
        userBEI.loggedIn = false;
        socket.emit('sendingBackSignOutConfirmation');
    })

    socket.on('newUserInfoSaved', (username, password, email) => {
        if (username != userBEI.accountUsername) {
            // username was changed
            if (!possibleAccounts[username]) {
                possibleAccounts[username] = possibleAccounts[userBEI.accountUsername];
                possibleAccounts[username].username = username

                delete possibleAccounts[userBEI.accountUsername];

                userBEI.accountUsername = username;
                
                socket.emit('newUserInfoConfirmed', 'username_change', username);
            } else {
                socket.emit('newInfoUserCannotBeSaved', 'username_exists')
            }
        } else if (email != possibleAccounts[userBEI.accountUsername].email) {
            possibleAccounts[userBEI.accountUsername].email = email;

            socket.emit('newUserInfoConfirmed', 'email_change', email)
        }
        
        
        // if (password != possibleAccounts[userBEI.accountUsername].password) {
        //     // password was changed
        //     possibleAccounts[userBEI.accountUsername].password = password;

        //     socket.emit('newUserInfoConfirmed', 'password_change', password)
        // } 
        
        // if (email != possibleAccounts[userBEI.accountUsername].email) {
        //     possibleAccounts[userBEI.accountUsername].email = email;

        //     socket.emit('newUserInfoConfirmed', 'email_change', email)
        // }
    })

    socket.on('newUserGameInfoSaved', (usernameDisplay, preSetChips, preSetChipsAmount) => {
        possibleAccounts[userBEI.accountUsername].profileOptions.useUsername = usernameDisplay;
        possibleAccounts[userBEI.accountUsername].profileOptions.usePreSetChips = preSetChips;

        if (preSetChips === 'No') {
            possibleAccounts[userBEI.accountUsername].profileOptions.preSetChipAmount = '';
        } else if (preSetChips === 'Yes') {
            possibleAccounts[userBEI.accountUsername].profileOptions.preSetChipAmount = preSetChipsAmount;
        }

        socket.emit('newUserGameInfoConfirmed', possibleAccounts[userBEI.accountUsername].profileOptions)

    })

    //////////////////////////////////////////////////////////////////

    ////// SOCIALS LISTENERS //////

    // Friend Listeners //

    socket.on('userSendsFriendRequest', (friendUsername) => {
        if (possibleAccounts[friendUsername]) {
            let newAlert = {'type': 'friend_request', 'sender': userBEI.accountUsername}
            possibleAccounts[friendUsername].pendingAlerts.push(newAlert);
            possibleAccounts[friendUsername].friendRequests.push(userBEI.accountUsername);
            io.to(possibleAccounts[friendUsername].idHolder).emit('sendingFriendRequestToReciever', newAlert)
            socket.emit('friendRequestCleared');
        } else {
            socket.emit('friendRequestFailed');
        }
    })

    socket.on('friendRequestAccepted', (alertInfo, index) => {
        possibleAccounts[userBEI.accountUsername].friendsList.push(alertInfo.sender)
        possibleAccounts[alertInfo.sender].friendsList.push(userBEI.accountUsername);
        socket.emit('friendRequestAcceptedConfirmed', alertInfo, index);
        io.to(possibleAccounts[alertInfo.sender].idHolder).emit('userAcceptedFriendRequest', userBEI.accountUsername);
    })

    // Groups Listeners //

    socket.on('groupCreated', (groupName) => {
        possibleAccounts[userBEI.accountUsername].groups[groupName] = {'host': userBEI.accountUsername, members: [userBEI.accountUsername], name: groupName, totalMembers: 1}
        possibleAccounts[userBEI.accountUsername].groupNames.push(groupName);
        socket.emit('groupCreationCleared', possibleAccounts[userBEI.accountUsername].groups[groupName]); 
    })

    socket.on('groupInviteSent', (username, groupName) => {
        if (possibleAccounts[username]) {
            let newAlert = {'type': 'group_invite', 'sender': userBEI.accountUsername, 'groupName': groupName}
            possibleAccounts[username].pendingAlerts.push(newAlert)

            io.to(possibleAccounts[username].idHolder).emit('sendingGroupInvite', newAlert);
            socket.emit('groupInviteConfirmed');
            
        } else {
            socket.emit('groupInviteFailed');
        }
    })

    socket.on('groupRequestAccepted', (alertInfo, index) => {
        possibleAccounts[alertInfo.sender].groups[alertInfo.groupName].members.push(userBEI.accountUsername);
        possibleAccounts[alertInfo.sender].groups[alertInfo.groupName].totalMembers++;
        possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName] = possibleAccounts[alertInfo.sender].groups[alertInfo.groupName];

        io.to(possibleAccounts[alertInfo.sender].idHolder).emit('groupInviteHasBeenAccepted', possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName])
        socket.emit('sendingGroupInfoAfterInviteAccepted', possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName], alertInfo, index)

    })

    socket.on('startingGameWithGroup', (groupPlayersArr) => {
        for (let i = 0; i < groupPlayersArr.length; i++) {
            io.to(possibleAccounts[groupPlayersArr[i]].idHolder).emit('gameStartedWithGroup');
        }

        socket.emit('gameThroughGroupConfirmed', groupPlayersArr);
    })

    // Other Listeners //

    socket.on('requestDeclined', (alertInfo, index) => {
        socket.emit('sendingBackRequestDecline', alertInfo, index)
    })

    socket.on('invitingPlayerToGame', (username) => {
        if (possibleAccounts[username]) {
            io.to(possibleAccounts[username].idHolder).emit('sendingGameInvite', {'type': 'game_invite', 'sender': userBEI.accountUsername, 'gameCode': userBEI.roomLabel});
            socket.emit('inviteToGameConfirmed');
        } else {
            socket.emit('inviteToGameFailed');
        }
    })

    socket.on('gameInviteAccepted', (alertInfo, index) => {
        userBEI.roomLabel = alertInfo.gameCode;
        socket.join(alertInfo.gameCode);
        socket.emit('sendingUserToGameAfterAccept', alertInfo, index);
    })

    //////////////////////////////////////////////////////////////////

    ////// GAME LISTENERS //////

    // Pre Game Listeners //

    socket.on('newGame', (rS, ante, timer, progressiveBlinds, gameStyle, bbMinRange, bbMaxRange, chipUnits, t1, t2) => {
        var roomName
        if (rS === 0 && ante === 0) {
            console.log('hi');
        } else if (rS != 0 && ante != 0) {

            socket.emit('gameStateCreated');

            roomName = makeId(5);

            userBEI['roomLabel'] = roomName;

            socket.join(roomName);

            gameSettingsObj = {
                active: true,
                players: [],
                idHolder: roomName,
                hostId: userBEI.id,
                pNickNames: [],
                pChips: [],
                totalBuyIns: [],
                gameStarted: false,
                updatedPChips: [],
                desiredRoomSize: rS,
                ante: ante,
                timer: timer,
                gameStyle: gameStyle,
                progressiveBlinds: progressiveBlinds,
                minBuyIn: (bbMinRange * ante),
                maxBuyIn: (bbMaxRange * ante),
                chipUnits: chipUnits,
                throughGroup: false,
                groupMembersInvited: null
            };

            if (t1 === 'group_game') {
                gameSettingsObj.throughGroup = true;
                gameSettingsObj.groupMembersInvited = t2;
            }

            globalState[roomName.toString()] = gameSettingsObj;
        }
    })

    socket.on('playerEntersGameCode', (gameCode) => {
        if (globalState[gameCode]) {
            userBEI.roomLabel = gameCode;
            socket.join(gameCode)
            socket.emit('userIsClearedToJoinGame')
        } else {
            socket.emit('gameCodeDoesNotExist');
        }
    })

    socket.on('playerSubmitsInGameDisplayInfo', (displayObj) => {
        if (globalState[userBEI.roomLabel]) {
            globalState[userBEI.roomLabel].pNickNames.push(displayObj.enteredDisplayName)
            globalState[userBEI.roomLabel].pChips.push(Number(displayObj.enteredDisplayBuyIn))
            globalState[userBEI.roomLabel].players.push(userBEI.id)
            globalState[userBEI.roomLabel].totalBuyIns.push(Number(displayObj.enteredDisplayBuyIn))

            io.to(userBEI.roomLabel).emit('sendingUserToGamePage', userBEI.roomLabel, globalState[userBEI.roomLabel], displayObj);

            if (globalState[userBEI.roomLabel].throughGroup) {
                let newAlert = {'type': 'game_invite', 'sender': userBEI.accountUsername, 'gameCode': userBEI.roomLabel};
                for (let i = 0; i < globalState[userBEI.roomLabel].groupMembersInvited.length; i++) {
                    io.to(possibleAccounts[globalState[userBEI.roomLabel].groupMembersInvited[i]].idHolder).emit('sendingGroupGameInvite', newAlert);
                }
            }

        }
    })

    socket.on('initGameStarted', (info, info2) => {
        io.to(userBEI.roomLabel).emit('sendingBackGameStart', info)
    })   

    // In Game Listeners //

    socket.on('winnerHasBeenChosen', (winner) => {
        console.log(winner);
        io.to(userBEI.roomLabel).emit('sendingBackWinnerOfRound', winner)
    })

    socket.on('initNextRound', () => {
        io.to(userBEI.roomLabel).emit('sendingBackInitNextRound');
    })

    socket.on('userLeavesGame', (turn) => {
        // globalState[userBEI.roomLabel].players[turn - 1] = '';
        // globalState[userBEI.roomLabel].pNickNames[turn - 1] = '';
        // globalState[userBEI.roomLabel].pChips[turn - 1] = '';

        globalState[userBEI.roomLabel].players.splice(turn - 1, 1)
        globalState[userBEI.roomLabel].pNickNames.splice(turn - 1, 1)
        globalState[userBEI.roomLabel].pChips.splice(turn - 1, 1)


        io.to(userBEI.roomLabel).emit('playerHasLeftGame', turn);

        if (globalState[userBEI.roomLabel].active) {
            if (globalState[userBEI.roomLabel].players.length === 0) {
                // console.log('Game Empty Deleting Room: ')
                // console.log(globalState[userBEI.roomLabel]);
                delete globalState[userBEI.roomLabel]   
            }
        }

        // console.log('Global State current state: ')
        // console.log(globalState);

        socket.leave(userBEI.roomLabel)
        userBEI.roomLabel = null;
    })

    socket.on('roomSizeChanged', (newRS) => {

        globalState[userBEI.roomLabel].desiredRoomSize = newRS;

        io.to(userBEI.roomLabel).emit('sendingBackRSChange', newRS)
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

    

});



server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));







// setInterval(() => {
//     io.emit('ping', { data: (new Date()) / 1 });
// }, 1000);