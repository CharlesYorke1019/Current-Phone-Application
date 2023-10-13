import { Button, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import InvitingFriendsToGroup from './InvitingFriendsToGroup';
import { useNavigation } from '@react-navigation/native'

const SpecificGroupView = ({user, currentView, setDisplayOpen, groupName}) => {

    // Variables //

    const navigation = useNavigation();

    let membersArr = [];

    let [invitingMember, setInvitingMember] = useState(false);

    let [selectGroupMembers, setSelectGroupMembers] = useState([]);

    let [initStartGame, setInitStartGame] = useState(false);

    let [isHost, setIsHost] = useState()

    let groupButtonsArr = [];

    //////////////////////////////////////////////////////////////////

    // Functions //

    useEffect(() => {
        for (var key in user.groups) {
            if (key === groupName) {
                if (user.groups[key].host === user.accountInfo.username) {
                    setIsHost(true);
                } else {
                    setIsHost(false);
                }
            }
        }
    })

    const initGroupInvite = () => {
        setInvitingMember(true)
    }

    const invitingPlayersToGroupGame = (username) => {
        if (initStartGame) {
            if (!selectGroupMembers.includes(username)) {
                
                selectGroupMembers.push(username)
                // setSelectGroupMembers(selectGroupMembers)

                setSelectGroupMembers([
                    ...selectGroupMembers
                ])

                

            } else {

                for (let i = 0; i < selectGroupMembers.length; i++) {
                    if (selectGroupMembers[i] === username) {
                        selectGroupMembers.splice(i, 1);
                        setSelectGroupMembers([
                            ...selectGroupMembers
                        ])
                    }
                }

            }
        }
    }

    const userBeginsGameWithGroup = () => {
        user.socket.emit('startingGameWithGroup', selectGroupMembers);
    }

    const xOutOfStartGame = () => {
        setSelectGroupMembers([]);
        setInitStartGame(false);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('gameThroughGroupConfirmed', (membersInvitedArr) => {
        user.creatingGameMethod = 'group_game';
        user.groupMembersGameArr = membersInvitedArr;
        navigation.navigate('CreateGame', {
            paramKey: user
        })
    })

    //////////////////////////////////////////////////////////////////

    // Specific Group Elements //

    if (currentView) {
        for (var key in user.groups) {
            if (key === groupName) {
                for (let i = 0; i < user.groups[key].members.length; i++) {
                    if (user.groups[key].members[i] != user.accountInfo.username) {
                        membersArr.push(
                            <TouchableOpacity key={i} style={{ borderWidth: 2, borderRadius: 5, minWidth: '25%', maxHeight: '15%', justifyContent: 'center', marginTop: 10, justifyContent: 'center', alignContent: 'center', backgroundColor: selectGroupMembers.includes(i) ? 'lightcoral' : 'lavender'}} disabled={!initStartGame}
                                onPress={() => invitingPlayersToGroupGame(i)}
                            >
                                <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, marginRight: 5, marginLeft: 5, marginBottom: 5, marginTop: 5}}>{user.groups[key].members[i]}</Text>
                            </TouchableOpacity>
                        )
                    }
                }
                if (user.groups[key].host === user.accountInfo.username) {
                    groupButtonsArr.push(
                        <View key={'hostStuff'} style={{alignSelf: 'center', justifyContent: 'center', position: 'absolute', top: 500}}>
                            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', marginBottom: 15}}
                                onPress={() => setInitStartGame(true)}
                            >
                                <Text style={{textAlign: 'center', fontSize: 22, marginRight: 5, marginLeft: 5, fontFamily: 'Copperplate'}}>Start Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center'}}>
                                <Text style={{textAlign: 'center', fontSize: 22, marginRight: 5, marginLeft: 5, fontFamily: 'Copperplate'}}>Disband Group</Text>
                            </TouchableOpacity>
                        </View>
                    )
                } else {
                    groupButtonsArr.push(
                        <View key={'memberStuff'} style={{alignSelf: 'center', justifyContent: 'center', position: 'absolute', top: 500}}>
                            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', marginBottom: 15}}>
                                <Text style={{textAlign: 'center', fontSize: 22, marginRight: 5, marginLeft: 5, fontFamily: 'Copperplate'}}>Leave Group</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '85%'}}>
            <View style={{display: invitingMember === false && initStartGame === false ? 'flex' : 'none'}}>
              
                <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender'}}
                    onPress={() => setDisplayOpen(false)}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>X</Text>
                </TouchableOpacity>

                <Text style={{fontSize: 39, textAlign: 'center', marginBottom: 15, marginTop: 15, borderBottomWidth: 2, fontFamily: 'Copperplate'}}>{groupName}</Text>
                <Text style={{textAlign: 'center', marginBottom: 15, fontSize: 20, fontFamily: 'Copperplate'}}>Members</Text>

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', justifyContent: 'center', marginBottom: 20, display: isHost === true ? 'flex' : 'none'}}
                    onPress={() => initGroupInvite()}
                >
                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, marginRight: 5, marginLeft: 5, marginBottom: 5, marginTop: 5}}>Invite Members</Text>
                </TouchableOpacity>

                <View style={{borderWidth: 3, borderRadius: 5, width: '90%', height: '50%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {membersArr}
                </View>
                {groupButtonsArr}
            </View>
            <View style={{display: invitingMember === true ? 'flex' : 'none', height: '70%', width: '80%', alignSelf: 'center', marginTop: 80}}>
                <InvitingFriendsToGroup user={user} setCurrentView={setInvitingMember} groupName={groupName}   />
            </View>

            <View style={{display: initStartGame === true ? 'flex' : 'none'}}>
        
                <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender'}}
                    onPress={() => xOutOfStartGame()}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, lineHeight: 38}}>X</Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center', marginTop: 20, marginBottom: 20, fontSize: 24, fontFamily: 'Copperplate', width: '75%', alignSelf: 'center'}}>Select The Group Members You Wish To Invite</Text>
                <View style={{borderWidth: 3, borderRadius: 5, width: '90%', height: '50%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30}}>
                    {membersArr}
                </View>

                <TouchableOpacity style={{borderWidth: 2, backgroundColor: 'lavender', width: '50%', alignSelf: 'center', marginBottom: 34, borderRadius: 5}}
                    onPress={() => setSelectGroupMembers([])}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, lineHeight: 38}}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderTopWidth: 2, backgroundColor: 'lavender'}}
                    onPress={() => userBeginsGameWithGroup()}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, lineHeight: 37}}>Begin Game</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default SpecificGroupView