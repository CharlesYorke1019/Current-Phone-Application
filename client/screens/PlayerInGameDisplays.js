import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
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

    let [displayName, setDisplayName] = useState(user.accountInfo.username)
    let [buyIn, setBuyIn] = useState(user.profileOptions.preSetChipAmount.toString());

    let displayNameHolder;
    let buyInHolder;

    //////////////////////////////////////////////////////////////////

    // Functions //

    user.changeCurrentPage('PlayerInGameDisplays');

    const inGameDisplayInfoSubmitted = () => {
        currentUser.enteredDisplayName = displayName;
        currentUser.enteredDisplayBuyIn = buyIn;

        user.socket.emit('playerSubmitsInGameDisplayInfo', currentUser)
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingUserToGamePage', (roomId, gameObj) => {
        user.inGame = true;
        user.playerGameObj = new Player(currentUser.enteredDisplayName, Number(currentUser.enteredDisplayBuyIn), null, 0, false, roomId, user.socket);
        navigation.navigate('GamePage', {
            paramKey: user,
            gameKey: gameObj,
        })
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey', backgroundColor: 'mistyrose'}}>
            <ProfileButton sentU={user} />
            <GoHomeButton user={user} />
            <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 150, justifyContent: 'center', backgroundColor: 'papayawhip'}}>
                <Text style={{alignSelf: 'center', fontSize: 30, marginBottom: 20, marginTop: 10}}>Enter Display Name</Text>
                <TextInput 
                    value={displayName}
                    onChangeText={(v) => setDisplayName(v)}
                    style={{width: 200, textAlign: 'center', height: 35, backgroundColor: 'lightgrey', alignSelf: 'center', borderWidth: 3, borderRadius: 5, marginBottom: 20}}
                    placeholder='enter here'
                    onSubmitEditing={() => buyInRef.current.focus()}
                />
            </View>
            <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 325, justifyContent: 'center', backgroundColor: 'papayawhip'}}>
                <Text style={{alignSelf: 'center', fontSize: 30, marginBottom: 20, marginTop: 10}}>Enter Buy-In</Text>
                <TextInput 
                    value={buyIn}
                    onChangeText={(v) => setBuyIn(v)}
                    style={{width: 200, textAlign: 'center', height: 35, backgroundColor: 'lightgrey', alignSelf: 'center', borderWidth: 3, borderRadius: 5, marginBottom: 20}}
                    placeholder='enter here'
                    ref={buyInRef}
                />
            </View>
            <View style={{alignContent: 'center', alignSelf: 'center', position: 'absolute', top: 550, borderWidth: 4, borderRadius: 5, borderColor: 'black', backgroundColor: 'lightgrey'}}>
                <Button 
                    title='Enter Game'
                    color='black'
                    onPress={() => inGameDisplayInfoSubmitted()}
                />
            </View>
            <View style={{alignContent: 'center', alignSelf: 'center', position: 'absolute', top: 630, borderWidth: 4, borderRadius: 5, borderColor: 'black', backgroundColor: 'lightgrey'}}>
                <Button 
                    title='Go Back'
                    color='black'
                    onPress={() => navigation.navigate('CreateGame', {
                        paramKey: user
                    })}
                />
            </View>
        </View>
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