import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const SpecificFriendView = ({user, username, currentView, setCurrentView}) => {

    // Variables 

    let [initRemoveFriend, setInitRemoveFriend] = useState(false)

    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('');

    //////////////////////////////////////////////////////////////////

    // Functions //

    const userInitRemoveFriend = () => {
        setInitRemoveFriend(true);
    }

    const userDeclinesRemoveFriend = () => {
        setInitRemoveFriend(false)
    }

    const userRemovesFriend = () => {
        user.socket.emit('userConfirmsRemoveFriend', username);
    }

    const settingReadyResponse = () => {
        setResponseText('Friend Has Beeen Removed!')
        setReadyResponse(true);
    }

    const xOutOfWindow = () => {
        if (!readyResponse) {
            if (!initRemoveFriend) {
                setCurrentView(false);
            } else {
                setInitRemoveFriend(false);
            }
        } else {
            setCurrentView(false);
            setReadyResponse(false);
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('friendRemovalConfirmed', (friendsList) => {
        settingReadyResponse();
        user.updateFriendsList(friendsList);
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '50%', marginTop: '25%'}}>
            <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>X</Text>
            </TouchableOpacity>

            <View style={{display: initRemoveFriend === false ? 'flex' : 'none'}}>

                <View style={{width: '80%', alignSelf: 'center', marginBottom: '10%', marginTop: '10%'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 35, textAlign: 'center'}}>{username}</Text>
                </View>

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '50%', alignSelf: 'center'}}
                    onPress={() => userInitRemoveFriend()}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, marginTop: 5, marginBottom: 5}}>Remove Friend</Text>
                </TouchableOpacity>
            </View>

            <View style={{display: initRemoveFriend === true && readyResponse === false ? 'flex' : 'none'}}>
                <View style={{width: '85%', alignSelf: 'center', marginTop: '5%', marginBottom: '10%'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 26, textAlign: 'center'}}>Are You Sure You Want To Remove This Friend?</Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', marginRight: 10}}
                        onPress={() => userRemovesFriend()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center', margin: 3}}>
                            Yes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender'}}
                        onPress={() => userDeclinesRemoveFriend()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center', margin: 3}}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <View style={{width: '85%', alignSelf: 'center', marginTop: '10%'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, textAlign: 'center'}}>{responseText}</Text>
                </View> 
            </View>

        </View>
    )
}

export default SpecificFriendView