class User {
    id;
    status;
    socket;
    loggedIn;
    accountInfo;
    inGame;
    playerGameObject;
    gameObjHolder;
    currentPage;
    socket;
    gameId;
    friendRequests = [];
    friendsList = [];
    groups = {}
    groupNames = []
    groupRequests = [];
    gameInvites = [];
    alerts = [];
    profileOptions = {
        'useUsername': 'No',
        'usePreSetChips': 'No',
        'preSetChipAmount': ''
    }

    constructor(id, status, loggedIn, accountInfo, inGame, playerGameObject, socket) {
        this.id = id
        this.status = status
        this.loggedIn = loggedIn
        this.inGame = inGame
        this.accountInfo = accountInfo
        this.playerGameObject = playerGameObject
        this.socket = socket
    }

    changeCurrentPage(newPosition) {
        this.currentPage = newPosition;
    }

    addAlert(inviteInfo) {


        if (inviteInfo.type === 'friend_request') {

            if (!this.friendRequests.includes(inviteInfo.sender) && !this.friendsList.includes(inviteInfo.sender)) {
                this.alerts.push({'type': inviteInfo.type, 'sender': inviteInfo.sender})
                this.friendRequests.push(inviteInfo.sender);
            }

        } else if (inviteInfo.type === 'group_invite') {
            if (!this.groupRequests.includes(inviteInfo.sender) && !this.groupNames.includes(inviteInfo.groupName)) {
                this.alerts.push({'type': inviteInfo.type, 'sender': inviteInfo.sender, 'groupName': inviteInfo.groupName});
                this.groupRequests.push(inviteInfo.sender);
            }

        } else if (inviteInfo.type === 'game_invite') {
            if (!this.gameInvites.includes(inviteInfo.sender)) {
                this.alerts.push({'type': inviteInfo.type, 'sender': inviteInfo.sender, 'gameCode': inviteInfo.gameCode});
                this.gameInvites.push(inviteInfo.sender)
            }
        }

    }

    removeAlert(alertInfo, index) {
        if (alertInfo.type === 'friend_request') {

            for (let i = 0; i < this.friendRequests.length; i++) {
                if (this.friendRequests[i] === alertInfo.sender) {
                    this.friendRequests.splice(i, 1);
                }
            }

        } else if (alertInfo.type === 'group_invite') {

            for (let i = 0; i < this.groupRequests.length; i++) {
                if (this.groupRequests[i] === alertInfo.sender) {
                    this.groupRequests.splice(i, 1);
                }
            }

        } else if (alertInfo.type === 'game_invite') {
            
            for (let i = 0; i < this.gameInvites.length; i++) {
                if (this.gameInvites[i] === alertInfo.sender) {
                    this.gameInvites.splice(i, 1);
                }
            }
        }

        this.alerts.splice(index, 1);
    }

    addFriendToList(friendUsername) {
        if (!this.friendsList.includes(friendUsername)) {
            this.friendsList.push(friendUsername);
        }
    }

    addGroup(groupInfo) {
        if (!this.groupNames.includes(groupInfo.name)) {
            this.groups[groupInfo.name] = groupInfo;
            this.groupNames.push(groupInfo.name)
        }

    }

    updateGroupInfo(groupInfo) {
        this.groups[groupInfo.name] = groupInfo;
    }

    leaveGame(arg) {
        this.socket.emit('userLeavesGame', arg);
        this.currentPage = 'Home';
    }

    updateAccountInfo(changeType, infoChanged) {
        if (changeType === 'username_change') {
            this.accountInfo.username = infoChanged;
        } else if (changeType === 'password_change') {
            this.accountInfo.password = infoChanged;
        } else if (changeType === 'email_change') {
            this.accountInfo.email = infoChanged;
        }
    }

    updateGameInfo(profileObj) {
        this.profileOptions = profileObj;
    }

    signsOut() {
        this.loggedIn = false;
        this.accountInfo = {};
        this.friendRequests = [];
        this.friendsList = [];
        this.groups = {};
        this.groupNames = [];
        this.groupRequests = [];
        this.gameInvites = [];
        this.alerts = [];
    }



    
}

export default User;