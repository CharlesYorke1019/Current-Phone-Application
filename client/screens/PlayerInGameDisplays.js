import { StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Player from '../Models/PlayerModel'

import GoHomeButton from '../Components/GoHomeButton';
import ProfileButton from '../Components/ProfileButton';

const PlayerInGameDisplays = ({route}) => {

    // Variables // 

    const navigation = useNavigation();
    let user = route.params.paramKey

    let currentUser = {
        enteredDisplayName: null,
        enteredDisplayBuyIn: null
    }

    const buyInRef = useRef();
    let [initEnterGame, setInitEnterGame] = useState(false);

    let displayNameHolder;
    let buyInHolder;

    //////////////////////////////////////////////////////////////////

    // Functions //

    user.changeCurrentPage('PlayerInGameDisplays');

    const inGameDisplayInfoSubmitted = () => {
        setInitEnterGame(true)

        user.socket.emit('playerSubmitsInGameDisplayInfo', currentUser)
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingUserToGamePage', (roomId, gameObj, obj) => {
        user.inGame = true;
        user.playerGameObj = new Player(obj.enteredDisplayName, Number(obj.enteredDisplayBuyIn), null, 0, false, roomId, user.socket);
        navigation.navigate('GamePage', {
            paramKey: user,
            gameKey: gameObj,
        })
    })

    //////////////////////////////////////////////////////////////////

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey', backgroundColor: 'mistyrose'}}>
                <ProfileButton sentU={user} />
                <GoHomeButton user={user} />
                <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 150, justifyContent: 'center', backgroundColor: 'papayawhip'}}>
                    <Text style={{alignSelf: 'center', fontSize: 30, marginBottom: 25, marginTop: 10, fontFamily: 'Copperplate'}}>Enter Display Name</Text>
                    <TextInput 
                        value={displayNameHolder}
                        onChangeText={(v) => currentUser.enteredDisplayName = v}
                        style={{width: 200, textAlign: 'center', height: 35, backgroundColor: 'lavender', alignSelf: 'center', borderWidth: 3, borderRadius: 5, marginBottom: 20}}
                        placeholder='enter here'
                        onSubmitEditing={() => buyInRef.current.focus()}
                    />
                </View>
                <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 325, justifyContent: 'center', backgroundColor: 'papayawhip'}}>
                    <Text style={{alignSelf: 'center', fontSize: 30, marginBottom: 25, marginTop: 10, fontFamily: 'Copperplate'}}>Enter Buy-In</Text>
                    <TextInput 
                        value={buyInHolder}
                        onChangeText={(v) => currentUser.enteredDisplayBuyIn = v}
                        style={{width: 200, textAlign: 'center', height: 35, backgroundColor: 'lavender', alignSelf: 'center', borderWidth: 3, borderRadius: 5, marginBottom: 20}}
                        placeholder='enter here'
                        ref={buyInRef}
                        keyboardType='numeric'
                    />
                </View>
            
                <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center', position: 'absolute', top: 550, borderWidth: 4, borderRadius: 5, borderColor: 'black', backgroundColor: 'lavender'}}
                    onPress={() => inGameDisplayInfoSubmitted()}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 24, marginRight: 5, marginLeft: 5}}>Enter Game</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center', position: 'absolute', top: 630, borderWidth: 4, borderRadius: 5, borderColor: 'black', backgroundColor: 'lavender'}}
                    onPress={() => navigation.navigate('CreateGame', {
                        paramKey: user
                    })}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 24, marginRight: 5, marginLeft: 5}}>Go Back</Text>
                </TouchableOpacity>

                <View style={{display: initEnterGame === true ? 'flex' : 'none', position: 'absolute', alignSelf: 'center', top: 270, flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='lightcoral' />
                    <Text style={{textAlign: 'center'}}>Loading Game State...</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PlayerInGameDisplays

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6'
    }
})