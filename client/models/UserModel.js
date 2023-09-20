class User {
    id;
    status;
    socket;
    loggedIn;
    accountInfo;
    inGame;
    playerGameObject;
    socket;
    gameId;
    friendRequests = [];
    friendsList = [];
    groups = {}
    groupNames = []
    groupRequests = [];
    alerts = [];

    constructor(id, status, loggedIn, accountInfo, inGame, playerGameObject, socket) {
        this.id = id
        this.status = status
        this.loggedIn = loggedIn
        this.accountInfo = accountInfo
        this.playerGameObject = playerGameObject
        this.socket = socket
    }

    addAlert(type, sender, aInfo) {

        if (type === 'friend_request') {

            if (!this.friendRequests.includes(sender) && !this.friendsList.includes(sender)) {
                this.alerts.push({'type': 'friend_request', 'sender': sender})
                this.friendRequests.push(sender);

            }

        } else if (type === 'group_request') {
            if (!this.groupRequests.includes(sender) && !this.groupNames.includes(aInfo)) {
                this.alerts.push({'type': 'group_request', 'sender': sender, 'groupName': aInfo})
                this.groupRequests.push(sender);
            }

        }

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



    
}

export default User;