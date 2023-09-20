import { SafeAreaView, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'

import GoHomeButton from '../Components/GoHomeButton';

const LogIn = ({route}) => {

    const liUser = {
        username: null,
        password: null
    }

    const navigation = useNavigation();
    let user = route.params.paramKey

    let passwordInput;
    let usernameInput;

    const userAttemptsToLogIn = () => {
        user.socket.emit('userLogsIn', liUser)
    }

    user.socket.on('logInSuccessful', (userInfo) => {
        user.accountInfo = {
            username: liUser.username,
            password: liUser.password
        }

        user.friendsList = userInfo.friendsList;
        
        for (var key in userInfo.groups) {
            if (key) {
                user.addGroup(userInfo.groups[key])
            }
        }

        

        user.loggedIn = true;
        navigation.navigate('Profile', {
            paramKey: user,
        })
    })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <GoHomeButton />
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 120}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>Log In!</Text>
            </View>
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 200}}>
                <Text style={{fontSize: 25, textAlign: 'center', marginTop: 10}}>Username</Text>
                <TextInput 
                    value={usernameInput}
                    onChangeText={(username) => liUser.username = username}
                    style={styles.inputStyle}
                />
            </View>
            <View style={{borderWidth: 2, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%', position: 'absolute', top: 320}}>
                <Text style={{fontSize: 25, textAlign: 'center', marginTop: 10}}>Password</Text>
                <TextInput 
                    value={passwordInput}
                    onChangeText={(password) => liUser.password = password}
                    style={styles.inputStyle}
                />
            </View>
            <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 480}}>
                <Button 
                    title='Log In'
                    onPress={userAttemptsToLogIn}
                    color='black'
                />
            </View>
        </View>
    )
}

export default LogIn

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