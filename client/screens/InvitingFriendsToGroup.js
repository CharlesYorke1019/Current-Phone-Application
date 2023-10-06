import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';

const InvitingFriendsToGroup = ({user, setCurrentView, groupName}) => {

    // Variables //

    let [responseText, setResponseText] = useState('');
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseType, setResponseType] = useState(0);

    let friendUsernameHolder;
    let submittedFriendUsername = null;

    const usernameRef = useRef();

    //////////////////////////////////////////////////////////////////

    // Functions //

    const xOutOfWindow = () => {
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

            if (submittedFriendUsername != null) {
                usernameRef.current.clear();
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('groupInviteConfirmed', () => {
        setResponseText('Group Invite Has Been Sent!')
        setReadyResponse(true)
        setResponseType(200)
    })

    user.socket.on('groupInviteFailed', () => {
        setResponseText('Group Invite Failed. Please Check The Username.')
        setReadyResponse(true)
        setResponseType(400)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5}}>
            <View style={{borderBottomWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 0, width: '100%'}}>
                <Button 
                    title='X'
                    onPress={() => xOutOfWindow()}
                    color='black'
                />
            </View>
            <View style={{display: readyResponse === false ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 24, position: 'absolute', alignSelf: 'center', top: -130}}>Enter Username Of Friend You Want To Add</Text>
                <TextInput 
                    value={friendUsernameHolder}
                    onChangeText={(friend) => submittedFriendUsername = friend}
                    style={styles.inputStyle}
                    placeholder='enter here'
                    ref={usernameRef}
                />
                <View style={{borderWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 130}}>
                    <Button 
                        title='Send Invite'
                        color='black'
                        onPress={() => user.socket.emit('groupInviteSent', submittedFriendUsername, groupName)}
                    />
                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none', justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{responseText}</Text>
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
        backgroundColor: '#DBDBD6',
        fontSize: 12,
        borderWidth: 2,
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center'
    }
})