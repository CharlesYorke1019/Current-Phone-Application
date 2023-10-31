import { StyleSheet, Text, View, TextInput, LogBox, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import GoHomeButton from '../Components/GoHomeButton';
import ProfileButton from '../Components/ProfileButton';

const JoinGame = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    let enteredGameCode = null;
    let gameCodeHolder;

    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    user.changeCurrentPage('JoinGame')

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('userIsClearedToJoinGame', () => {
        navigation.navigate('PlayerInGameDisplays', {
            paramKey: user,
        })
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey', backgroundColor: 'mistyrose'}}>
            <ProfileButton sentU={user} />
            <GoHomeButton user={user} />
            
            <View style={{backgroundColor: 'papayawhip', width: '100%', borderWidth: 3, borderRadius: 5, position: 'absolute', top: '13%', height: '75%'}}>
                <View style={{borderBottomWidth: 3, justifyContent: 'center'}}>
                    <Text style={{fontSize: 40, textAlign: 'center', borderBottomWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontFamily: 'Copperplate', lineHeight: 40}}>Enter Game Code</Text>
                </View>

                <View style={{width: '80%', alignSelf: 'center', position: 'absolute', top: '15%'}}>
                    <Text style={{fontSize: 12, fontFamily: 'Copperplate', textAlign: 'center', marginBottom: '2%'}}>When The Host Created The Game, A Game Code Was Generated. Please Enter That Here</Text>
                    <Text style={{fontSize: 10, fontFamily: 'Copperplate', textAlign: 'center'}}>(Game Code Can Be Found In The In Game Menu)</Text>
                </View>

                <View style={{position: 'absolute', alignSelf: 'center', top: '30%', width: '80%'}}>
                        <TextInput 
                            value={gameCodeHolder}
                            onChangeText={(gameCode) => enteredGameCode = gameCode}
                            style={styles.inputStyle}
                            placeholder='enter here'
                        />
                </View>
                <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', width: '35%', alignSelf: 'center', position: 'absolute', top: '60%'}}
                    onPress={() => user.socket.emit('playerEntersGameCode', enteredGameCode)}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 22, marginRight: 5, marginLeft: 5}}>Join Lobby</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default JoinGame


const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender',
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
        marginBottom: 60,
        marginTop: 30
    }
})