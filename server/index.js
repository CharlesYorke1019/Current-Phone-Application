require("dotenv").config();
const { group } = require("console");
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

function iterateOnNewUsername(aObj, originalName, newName) {
    if (aObj[originalName]) {
        for (let i = 0; i < aObj[originalName].friendsList.length; i++) {
            let friend = aObj[originalName].friendsList[i];
            for (let j = 0; j < aObj[friend].friendsList.length; j++) {
                if (aObj[friend].friendsList[j] === originalName) {
                    aObj[friend].friendsList[j] = newName;
                }
            } 

            for (var key in aObj[friend].groups) {
                if (aObj[friend].groups[key].members.includes(originalName)) {
                    for (let j = 0; j < aObj[friend].groups[key].members.length; j++) {
                        if (aObj[friend].groups[key].members[j] === originalName) {
                            aObj[friend].groups[key].members[j] = newName;
                        }
                    }
                }
            }
        }
    }
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

    socket.on('userCreatesAccount', (username, password) => {
        if (!possibleAccounts[username]) {
            userBEI.caUsernameHolder = username;
            possibleAccounts[username] = {username: username, password: password, idHolder: null, pendingAlerts: [], friendRequests: [], friendsList: [], groups: {}, groupNames: [], loggedIn: false, email: null, profileOptions:  {'useUsername': 'No', 'usePreSetChips': 'No', 'preSetChipAmount': 0}}
            socket.emit('userAccountValid');
        } else {
            socket.emit('userAccountInvalid')
        }
    })

    socket.on('userLogsIn', (username, password) => {
        if (possibleAccounts[username]) {
            if (password === possibleAccounts[username].password) {
                possibleAccounts[username].idHolder = userBEI.id;
                possibleAccounts[username].loggedIn = true;
                userBEI.accountUsername = username
                socket.emit('logInSuccessful', possibleAccounts[username])
            } else {
                socket.emit('logInFailed')
            }
        } else {
            socket.emit('logInFailed')
        }
    }) 

    socket.on('userConfirmsSignOut', () => {
        possibleAccounts[userBEI.accountUsername].loggedIn = false;
        possibleAccounts[userBEI.accountUsername].idHolder = null;
        userBEI.loggedIn = false;
        userBEI.accountUsername = null;
        socket.emit('sendingBackSignOutConfirmation');
    })

    socket.on('newUserInfoSaved', (username, password, email) => {
        if (username != userBEI.accountUsername) {
            // username was changed
            if (!possibleAccounts[username]) {
                possibleAccounts[username] = possibleAccounts[userBEI.accountUsername];
                possibleAccounts[username].username = username

                iterateOnNewUsername(possibleAccounts, userBEI.accountUsername, username);

                delete possibleAccounts[userBEI.accountUsername];

                userBEI.accountUsername = username;
                socket.emit('newUserInfoConfirmed', 'username_change', username);
            } else {
                socket.emit('newInfoUserCannotBeSaved', 'username_exists')
            }
        } else if (email != possibleAccounts[userBEI.accountUsername].email) {
            possibleAccounts[userBEI.accountUsername].email = email;

            socket.emit('newUserInfoConfirmed', 'email_change', email)
        } else if (password != possibleAccounts[userBEI.accountUsername].password) {
            possibleAccounts[userBEI.accountUsername].password = password;

            socket.emit('newUserInfoConfirmed', 'password_change', password);
        }
        
    
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

    socket.on('accountDeleted', () => {
        if (possibleAccounts[userBEI.accountUsername]) {
            for (let i = 0; i < possibleAccounts[userBEI.accountUsername].friendsList.length; i++) {
                let friend = possibleAccounts[userBEI.accountUsername].friendsList[i];
                for (let j = 0; j < possibleAccounts[friend].friendsList.length; i++) {
                    if (possibleAccounts[friend].friendsList[i] === userBEI.accountUsername) {
                        possibleAccounts[friend].friendsList.splice(i , 1);
                    }
                }
                for (var key in possibleAccounts[friend].groups) {
                    if (possibleAccounts[friend].groups[key].members.includes(userBEI.accountUsername)) {
                        for (let j = 0; j < possibleAccounts[friend].groups[key].members.length; j++) {
                            if (possibleAccounts[friend].groups[key].members[j] === userBEI.accountUsername) {
                                possibleAccounts[friend].groups[key].members.splice(j, 1);
                            }
                        }
                    }
                }

                io.to(possibleAccounts[friend].idHolder).emit('connectedUserDeletedAccount', possibleAccounts[friend]);


                socket.emit('sendingAccountDeletion')
            }
            delete possibleAccounts[userBEI.accountUsername];
        }
    })

    //////////////////////////////////////////////////////////////////

    ////// SOCIALS LISTENERS //////

    // Friend Listeners //

    socket.on('userSendsFriendRequest', (friendUsername) => {
        if (possibleAccounts[friendUsername]) {
            let newAlert = {'type': 'friend_request', 'sender': userBEI.accountUsername, 'interacted': false}
            possibleAccounts[friendUsername].pendingAlerts.push(newAlert);
            possibleAccounts[friendUsername].friendRequests.push(userBEI.accountUsername);
            io.to(possibleAccounts[friendUsername].idHolder).emit('sendingFriendRequestToReciever', newAlert)
            socket.emit('friendRequestCleared');
        } else {
            socket.emit('friendRequestFailed');
        }
    })

    socket.on('friendRequestAccepted', (alertInfo, index, info) => {
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
            let newAlert = {'type': 'group_invite', 'sender': userBEI.accountUsername, 'groupName': groupName, 'interacted': false}
            possibleAccounts[username].pendingAlerts.push(newAlert)

            io.to(possibleAccounts[username].idHolder).emit('sendingGroupInvite', newAlert);
            socket.emit('groupInviteConfirmed');
            
        } else {
            socket.emit('groupInviteFailed');
        }
    })

    socket.on('groupRequestAccepted', (alertInfo, index, info) => {
       
        possibleAccounts[alertInfo.sender].groups[alertInfo.groupName].members.push(userBEI.accountUsername);
        possibleAccounts[alertInfo.sender].groups[alertInfo.groupName].totalMembers++;
        possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName] = possibleAccounts[alertInfo.sender].groups[alertInfo.groupName];

        io.to(possibleAccounts[alertInfo.sender].idHolder).emit('groupInviteHasBeenAccepted', possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName])
        socket.emit('sendingGroupInfoAfterInviteAccepted', possibleAccounts[userBEI.accountUsername].groups[alertInfo.groupName], alertInfo, index)

        for (let i = 0; i < possibleAccounts[userBEI.accountUsername].pendingAlerts.length; i++) {
            if (possibleAccounts[userBEI.accountUsername].pendingAlerts[i].type === 'group_invite') {
                if (possibleAccounts[userBEI.accountUsername].pendingAlerts[i].sender === alertInfo.sender && possibleAccounts[userBEI.accountUsername].pendingAlerts[i].groupName === alertInfo.groupName) {
                    possibleAccounts[userBEI.accountUsername].pendingAlerts.splice(i, 1);
                }
            }
        }

    })

    socket.on('startingGameWithGroup', (groupPlayersArr) => {
        for (let i = 0; i < groupPlayersArr.length; i++) {
            io.to(possibleAccounts[groupPlayersArr[i]].idHolder).emit('gameStartedWithGroup');
        }

        socket.emit('gameThroughGroupConfirmed', groupPlayersArr);
    })

    socket.on('userLeavesGroup', (groupName) => {
        
        for (let i = 0; i < possibleAccounts[userBEI.accountUsername].groups[groupName].members.length; i++) {
            let member = possibleAccounts[userBEI.accountUsername].groups[groupName].members[i];

            for (let j = 0; j < possibleAccounts[member].groups[groupName].members.length; j++) {
                if (possibleAccounts[member].groups[groupName].members[j] === userBEI.accountUsername) {
                    possibleAccounts[member].groups[groupName].members.splice(j, 1);
                }

                io.to(possibleAccounts[member].idHolder).emit('sendingBackUpdateGroupInfo', possibleAccounts[member].groups[groupName]);
            }
        }

        delete possibleAccounts[userBEI.accountUsername].groups[groupName];
        socket.emit('leaveGroupConfirmed', possibleAccounts[userBEI.accountUsername].groups);
 

    })

    socket.on('groupDeletionConfirmed', (groupName) => {
        for (let i = 0; i < possibleAccounts[userBEI.accountUsername].groups[groupName].members.length; i++) {

            if (possibleAccounts[userBEI.accountUsername].groups[groupName].members[i] != userBEI.accountUsername) {
                let member = possibleAccounts[userBEI.accountUsername].groups[groupName].members[i];

                delete possibleAccounts[member].groups[groupName]

                io.to(possibleAccounts[member].idHolder).emit('sendingGroupDeletionToMembers', possibleAccounts[member].groups);
            }
            
        }

        delete possibleAccounts[userBEI.accountUsername].groups[groupName];
        socket.emit('sendingBackGroupDeletion', possibleAccounts[userBEI.accountUsername].groups);


    })

    socket.on('groupMembersRemoved', (groupName, groupMembersArr) => {

        let groupInfo = possibleAccounts[userBEI.accountUsername].groups[groupName];

        let afterActionMembers = [];

        for (let i = 0; i < groupInfo.members.length; i++) {
            if (!groupMembersArr.includes(groupInfo.members[i])) {
                afterActionMembers.push(groupInfo.members[i]);
            }
        }

        groupInfo.members = afterActionMembers;

        for (let i = 0; i < groupMembersArr.length; i++) {
            delete possibleAccounts[groupMembersArr[i]].groups[groupName];
            io.to(possibleAccounts[groupMembersArr[i]].idHolder).emit('removedFromGroup', possibleAccounts[groupMembersArr[i]].groups);
        }

        groupInfo.members.forEach((el) => {
            possibleAccounts[el].groups[groupName] = groupInfo;
            io.to(possibleAccounts[el].idHolder).emit('groupMembersRemovalConfirmed', possibleAccounts[el].groups[groupName]);
        })

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

    socket.on('massInviteSentGroup', (groupName, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (possibleAccounts[arr[i]]) {
                let newAlert = {'type': 'group_invite', 'sender': userBEI.accountUsername, 'groupName': groupName}
                possibleAccounts[arr[i]].pendingAlerts.push(newAlert);
                io.to(possibleAccounts[arr[i]].idHolder).emit('sendingGroupInvite', newAlert)
                socket.emit('massGroupInvConfirmed');
            }
        }
    })

    //////////////////////////////////////////////////////////////////

    ////// GAME LISTENERS //////

    // Pre Game Listeners //

    socket.on('newGame', (rS, ante, timer, gameStyle, progressiveBlinds, bbMinRange, bbMaxRange, chipUnits, t1, t2) => {
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

    socket.on('winnerHasBeenChosen', (winner, type) => {
        io.to(userBEI.roomLabel).emit('sendingBackWinnerOfRound', winner, type)
    })

    socket.on('initNextRound', () => {
        io.to(userBEI.roomLabel).emit('sendingBackInitNextRound');
    })

    socket.on('userLeavesGame', (turn) => {
        // globalState[userBEI.roomLabel].players[turn - 1] = '';
        // globalState[userBEI.roomLabel].pNickNames[turn - 1] = '';
        // globalState[userBEI.roomLabel].pChips[turn - 1] = '';

        // if there is more than one player (meaning the game will continue) 
        if (globalState[userBEI.roomLabel].players.length > 1) {
            globalState[userBEI.roomLabel].players.splice(turn - 1, 1)
            globalState[userBEI.roomLabel].pNickNames.splice(turn - 1, 1)
            globalState[userBEI.roomLabel].pChips.splice(turn - 1, 1)

            io.to(userBEI.roomLabel).emit('playerHasLeftGame', turn);

        } else {
            // if there is only one player left (meaning the lobby will be disbanded)

            delete globalState[userBEI.roomLabel]

        }

        socket.leave(userBEI.roomLabel)
        userBEI.roomLabel = null;

        // if (globalState[userBEI.roomLabel].players.length > 1) {
        //     globalState[userBEI.roomLabel].players.splice(turn - 1, 1)
        //     globalState[userBEI.roomLabel].pNickNames.splice(turn - 1, 1)
        //     globalState[userBEI.roomLabel].pChips.splice(turn - 1, 1)
        // }


        // io.to(userBEI.roomLabel).emit('playerHasLeftGame', turn);

        // if (globalState[userBEI.roomLabel].active) {
        //     if (globalState[userBEI.roomLabel].players.length === 0) {
        //         delete globalState[userBEI.roomLabel]   
        //     }
        // }

        // socket.leave(userBEI.roomLabel)
        // userBEI.roomLabel = null;
    })

    socket.on('roomSizeChanged', (newRS) => {

        globalState[userBEI.roomLabel].desiredRoomSize = newRS;

        io.to(userBEI.roomLabel).emit('sendingBackRSChange', newRS)
    })

    socket.on('playerAddsOn', (turn, amount, totalChips) => {
        globalState[userBEI.roomLabel].pChips[turn - 1] = totalChips;
        globalState[userBEI.roomLabel].totalBuyIns[turn - 1] += amount;

        io.to(userBEI.roomLabel).emit('sendingBackAddOn', turn, totalChips, globalState[userBEI.roomLabel].totalBuyIns[turn - 1]);
    })

    socket.on('isABlind', (type) => {
        socket.emit('sendingBlindToUser', type);
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