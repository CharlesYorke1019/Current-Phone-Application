import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../Components/GoBackButton';

const AddingFriendsPage = ({userObj, setterAddingFriendInit}) => {
    const navigation = useNavigation();

    let user = userObj;
    let setter = setterAddingFriendInit;

    let friendUsernameHolder;
    let submittedFriendUsername = null;

    let [responseText, setResponseText] = useState('');
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseType, setResponseType] = useState(0);

    user.socket.on('friendRequestCleared', () => {
        setResponseText('Friend Request Was Sent!')
        setReadyResponse(true)
        setResponseType(200);
    })

    user.socket.on('friendRequestFailed', () => {
        setResponseText('Friend Request Failed Please Check The Username.')
        setReadyResponse(true)
        setResponseType(400)
    })

    const xOutOfResponse = () => {
        if (responseType === 200) {
            setterAddingFriendInit(false);
        } else if (responseType === 400) {
            setReadyResponse(false);
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 2, backgroundColor: 'papayawhip'}}>
            {/* <GoBackButton sentS={socket} sentU={user} /> */}

            <View style={{display: readyResponse === false ? 'flex' : 'none'}}>
                <View style={{borderWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: -206, width: '100%'}}>
                    <Button 
                        title='X'
                        onPress={() => setterAddingFriendInit(false)}
                        color='black'
                    />
                </View>
                <Text style={{textAlign: 'center', fontSize: 24, position: 'absolute', alignSelf: 'center', top: -130}}>Enter Username Of Friend You Want To Add</Text>
                <TextInput 
                    value={friendUsernameHolder}
                    onChangeText={(friend) => submittedFriendUsername = friend}
                    style={styles.inputStyle}
                />
                <View style={{borderWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 130}}>
                    <Button 
                        title='Submit Friend Request'
                        onPress={() => user.socket.emit('userSendsFriendRequest', submittedFriendUsername)}
                        color='black'
                    />
                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{responseText}</Text>
                <View style={{borderWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: -190, width: '100%'}}>
                    <Button 
                        title='X'
                        onPress={() => xOutOfResponse()}
                        color='black'
                    />
                </View>
            </View>
            
        </View>
    )

}

export default AddingFriendsPage

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
        top: -30
    }
})