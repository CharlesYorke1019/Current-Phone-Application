import { SafeAreaView, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'

import GoHomeButton from '../Components/GoHomeButton';

const CreateAccount = ({route}) => {
    
    const caUser = {
        chosenUN: null,
        chosenP: null,
        confirmChosenP: null
    }

    const navigation = useNavigation();
    let user = route.params.paramKey

    let usernameInput;
    let passwordInput;
    let confirmPasswordInput;

    const sendingCreateAccount2Server = () => {
        user.socket.emit('userCreatesAccount', (caUser))
    }

    user.socket.on('userAccountValid', () => {
        navigation.navigate('LogIn', {
            paramKey: user,
        })
    })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}} accessible={true}>
            <GoHomeButton />
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 120}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>Create Account</Text>
            </View>
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 200}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Username</Text>
                <TextInput 
                    value={usernameInput}
                    onChangeText={(username) => caUser.chosenUN = username}
                    style={styles.inputStyle}
                />
            </View>
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 320}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Password</Text>
                <TextInput 
                    value={passwordInput}
                    onChangeText={(password) => caUser.chosenP = password}
                    style={styles.inputStyle}
                />
            </View>
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 440}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>Confirm Password</Text>
                <TextInput 
                    value={confirmPasswordInput}
                    onChangeText={(password) => caUser.confirmChosenP = password}
                    style={styles.inputStyle}
                />
            </View>
            <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 600}}>
                <Button 
                    title = 'Create Account'
                    onPress={sendingCreateAccount2Server}
                    color='black'
                />
            </View>

        </View>
    )

}

export default CreateAccount

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5
    }
})