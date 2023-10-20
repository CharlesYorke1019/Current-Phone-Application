import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const ViewFriends = ({user, type, currentView, info, primaryView}) => {

    // Variables //

    let friendsArr = [];
    
    let [selectedFriends, setSelectedFriends] = useState([]);
    let [usernames, setUsernames] = useState([]);
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseType, setResponseType] = useState(0);
    let [responseText, setResponseText] = useState('');

    
    //////////////////////////////////////////////////////////////////

    // Functions //

    const selectingFriend = (index, username) => {
        if (!selectedFriends.includes(index) && !usernames.includes(username)) {

            selectedFriends.push(index);

            setSelectedFriends([
                ...selectedFriends
            ])

            usernames.push(username)

            setUsernames([
                ...usernames
            ])
            
        } else {
            selectedFriends.splice(index, 1);
            setSelectedFriends([
                ...selectedFriends
            ])

            usernames.splice(index, 1);
            setUsernames([
                ...usernames
            ])
        }
    }   

    const userSubmitsInvites = (type) => {
        if (type === 'group_invite') {
            user.socket.emit('massInviteSentGroup', info, usernames);
        } else if (type === 'game_invite') {
            user.socket.emit('massInviteSentGame', usernames)
        }
    }

    const xOutOfWindow = () => {
        if (type === 'group_invite') {
            if (readyResponse) {

                currentView(false);
                primaryView(false);
                setReadyResponse(false);
            } else {
                currentView(false);
            }
        } else if (type === 'game_invite') {
            if (readyResponse) {

            } else {
                currentView(false)
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('massGroupInvConfirmed', () => {
        setResponseText('Your Group Invites Have Been Sent!')
        setResponseType(200);
        setReadyResponse(true);

        selectedFriends = [];
        setSelectedFriends([
            ...selectedFriends
        ])

        usernames = [];
        setUsernames([
            ...usernames
        ])
    })  

    //////////////////////////////////////////////////////////////////

    // View Friends Elements //

    if (currentView) {
        if (type === 'group_invite') {
            for (var key in user.groups) {
                if (key === info) {
                    for (let i = 0; i < user.friendsList.length; i++) {
                        if (!user.groups[key].members.includes(user.friendsList[i])) {
                            friendsArr.push(
                                <TouchableOpacity key={i} style={{borderWidth: 3, borderRadius: 5, backgroundColor: selectedFriends.includes(i) ? 'lightcoral' : 'lavender', alignItems: 'center', height: '20%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}
                                    onPress={() => selectingFriend(i, user.friendsList[i])}
                                >
                                    <Text style={{textAlign: 'center', fontSize: 26, fontFamily: 'Copperplate', margin: 15}}>{user.friendsList[i]}</Text>
                                </TouchableOpacity>
                            )  
                        }
                    }
                }
            }   
        } else if (type === 'game_invite') {
            for (let i = 0; i < user.friendsList.length; i++) {
                friendsArr.push(
                    <TouchableOpacity key={i} style={{borderWidth: 3, borderRadius: 5, backgroundColor: selectedFriends.includes(i) ? 'lightcoral' : 'lavender', alignItems: 'center', height: '20%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}
                        onPress={() => selectingFriend(i, user.friendsList[i])}
                    >
                        <Text style={{textAlign: 'center', fontSize: 26, fontFamily: 'Copperplate', margin: 15}}>{user.friendsList[i]}</Text>
                    </TouchableOpacity>
                ) 
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1}}>

            <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>Back</Text>
            </TouchableOpacity>

            
            

            <View style={{flex: 1, display: readyResponse === false ? 'flex' : 'none'}}>

                {/* Select The Friends You Wish To Invite */}

                <View style={{width: '75%', alignSelf: 'center', marginBottom: 30}}>
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', marginTop: 10, fontSize: 16}}>Select The Friends You Wish To Invite</Text>
                </View>

            
                <ScrollView style={{borderWidth: 2, width: '90%', alignSelf: 'center', height: '65%', position: 'absolute', top: '10%', flexWrap: 'wrap', flexDirection: 'row', borderRadius: 5}} >
                    
                    {friendsArr}

                    <View style={{marginBottom: 1000}}>
                        <Text>Hi</Text>
                    </View>

                </ScrollView>

                <TouchableOpacity style={{borderWidth: 2, backgroundColor: 'lavender', width: '40%', alignSelf: 'center', borderRadius: 5, position: 'absolute', top: '83%'}}
                    onPress={() => setSelectedFriends([])}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 24}}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, backgroundColor: 'lavender', width: '40%', alignSelf: 'center', borderRadius: 5, position: 'absolute', top: '92%'}}
                    onPress={() => userSubmitsInvites(type)}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 24}}>Invite</Text>
                </TouchableOpacity>

            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <View style={{width: '75%', alignSelf: 'center', marginTop: '30%'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, textAlign: 'center'}}>{responseText}</Text>
                </View>
            </View>

        </View>
    )

}

export default ViewFriends