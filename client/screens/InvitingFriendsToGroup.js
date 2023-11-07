import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import ViewFriends from '../Models/ViewFriends';

const InvitingFriendsToGroup = ({user, setCurrentView, groupName}) => {

    // Variables //

    let [responseText, setResponseText] = useState('');
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseType, setResponseType] = useState(0);
    
    let [initViewFriends, setInitViewFriends] = useState(false);

    let friendUsernameHolder;
    let submittedFriendUsername = null;

    const usernameRef = useRef();


    
    //////////////////////////////////////////////////////////////////

    // Functions //

    const xOutOfWindow = () => {
        if (!initViewFriends) {
            if (readyResponse) {
                if (responseType === 200) {
                    setCurrentView(false);
                    usernameRef.current.clear();
                    setReadyResponse(false);
                } else if (responseType === 400) {
                    setReadyResponse(false);
                }
            } else {

                setCurrentView(false);

                if (usernameRef.current != null) {
                    usernameRef.current.clear();
                }
            }
        } else {
            console.log('hi');
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('groupInviteConfirmed', () => {
        setResponseText('Group Invite Has Been Sent!')
        setReadyResponse(true)
        setResponseType(200)
    })

    user.socket.on('groupInviteFailed', (type) => {
        if (type === 'member_already_in_group') {
            setResponseText('Group Invite Failed. User Being Invited Is Already In The Group.')
        } else if (type === 'doesnt_exist') {
            setResponseText('Group Invite Failed. Please Check The Username.')
        }
        setReadyResponse(true)
        setResponseType(400)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'papayawhip', borderRadius: 5}}>
            <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: 0, width: '100%', display: initViewFriends === false ? 'flex' : 'none'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>Back</Text>
            </TouchableOpacity>

            <View style={{display: readyResponse === false && initViewFriends === false ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center'}}>
                <View style={{width: '75%', alignSelf: 'center', position: 'absolute'}}>
                    <Text style={{textAlign: 'center', fontSize: 24, position: 'absolute', alignSelf: 'center', top: -230, fontFamily: 'Copperplate'}}>Enter Username Of Friend You Want To Add</Text>
                </View>
                <TextInput 
                    value={friendUsernameHolder}
                    onChangeText={(friend) => submittedFriendUsername = friend}
                    style={styles.inputStyle}
                    placeholder='enter here'
                    ref={usernameRef}
                />

                <TouchableOpacity style={{borderWidth: 3, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: 0, borderRadius: 5}}
                    onPress={() => setInitViewFriends(true)}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 16, textAlign: 'center', marginRight: 5, marginLeft: 5}}>View Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 3, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: 170, borderRadius: 5}}
                    onPress={() => user.socket.emit('groupInviteSent', submittedFriendUsername, groupName, user.groups)}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 22, lineHeight: 40, textAlign: 'center', marginRight: 5, marginLeft: 5}}>Send Invite</Text>
                </TouchableOpacity>

            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center'}}>
                <View style={{alignSelf: 'center', width: '75%'}}>
                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>{responseText}</Text>
                </View>
                    
            </View>

            <View style={{display: initViewFriends === true ? 'flex' : 'none', width: '100%', height: '100%'}}>
                <ViewFriends user={user} type={'group_invite'} currentView={setInitViewFriends} info={groupName} primaryView={setCurrentView} />
            </View>
        </View>
    )
}

export default InvitingFriendsToGroup

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender',
        fontSize: 12,
        borderWidth: 2,
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 5,
        top: -100
    }
})