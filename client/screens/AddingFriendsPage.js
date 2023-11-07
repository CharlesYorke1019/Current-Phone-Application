import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'

const AddingFriendsPage = ({userObj, setterAddingFriendInit}) => {

    // Variables //

    const navigation = useNavigation();
    let user = userObj;
    let setter = setterAddingFriendInit;

    let friendUsernameHolder;
    let submittedFriendUsername = null;

    let [responseText, setResponseText] = useState('');
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseType, setResponseType] = useState(0);

    const usernameRef = useRef();

    //////////////////////////////////////////////////////////////////

    // Functions //

    const xOutOfWindow = () => {
        if (readyResponse) {
            if (responseType === 200) {
                setterAddingFriendInit(false);
                usernameRef.current.clear();
                setReadyResponse(false)
            } else if (responseType === 400) {
                setReadyResponse(false)
            }
        } else {
            setterAddingFriendInit(false);

            if (usernameRef.current != null) {
                usernameRef.current.clear();
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('friendRequestCleared', () => {
        setResponseText('Friend Request Was Sent!')
        setReadyResponse(true)
        setResponseType(200);

        usernameRef.current.clear();
        friendUsernameHolder = '';
    })

    user.socket.on('friendRequestFailed', (type) => {
        if (type === 'already_friends') {
            setResponseText('Friend Request Failed. You Are Already Friends With The User You Tried To Add')
        } else if (type === 'doesnt_exist') {
            setResponseText('Friend Request Failed Please Check The Username.')
        }

        setReadyResponse(true)
        setResponseType(400)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip'}}>
            <TouchableOpacity style={{borderBottomWidth: 3, backgroundColor: 'lavender', alignSelf: 'center', width: '100%', position: 'absolute', top: 0, height: '10%'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, lineHeight: 38}}>X</Text>
            </TouchableOpacity>
            <View style={{display: readyResponse === false ? 'flex' : 'none',  height: '50%', width: '80%', justifyContent: 'center', marginTop: '62%'}}>
                <Text style={{textAlign: 'center', fontSize: 24, position: 'absolute', alignSelf: 'center', top: -130, fontFamily: 'Copperplate'}}>Enter The Username You Want To Add</Text>
                <TextInput 
                    value={friendUsernameHolder}
                    onChangeText={(friend) => submittedFriendUsername = friend}
                    style={styles.inputStyle}
                    ref={usernameRef}
                    placeholder='enter here'
                />

                <TouchableOpacity style={{borderWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 130, backgroundColor: 'lavender', borderRadius: 5}}
                    onPress={() => user.socket.emit('userSendsFriendRequest', submittedFriendUsername)}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 25, marginRight: 5, marginLeft: 5}}>Submit</Text>
                </TouchableOpacity>

            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', width: '75%'}}>
                <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>{responseText}</Text>
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
        backgroundColor: 'lavender',
        fontSize: 12,
        borderWidth: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: -30,
        textAlign: 'center',
        borderRadius: 5
    }
})