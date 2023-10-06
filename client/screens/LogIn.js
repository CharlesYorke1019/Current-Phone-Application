import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LogIn = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    const liUser = {
        username: null,
        password: null
    }

    let passwordInput;
    let usernameInput;

    const usernameRef = useRef();
    const passwordRef = useRef();

    let [loginFail, setLoginFail] = useState(false)
    let [responseText, setResponseText] = useState('');

    let [showPassword, setShowPassword] = useState(false);

    //////////////////////////////////////////////////////////////////

    // Functions //

    const userAttemptsToLogIn = () => {
        user.socket.emit('userLogsIn', liUser)
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's

    user.socket.on('logInSuccessful', (userInfo) => {
        user.accountInfo = {
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email
        }

        user.friendsList = userInfo.friendsList;
        user.profileOptions = userInfo.profileOptions;
        
        for (var key in userInfo.groups) {
            if (key) {
                user.addGroup(userInfo.groups[key])
            }
        }

        for (let i = 0; i < userInfo.pendingAlerts.length; i++) {
            user.addAlert(userInfo.pendingAlerts[i])
        }   

        user.loggedIn = true;
        navigation.navigate('Profile', {
            paramKey: user,
        })
    })

    user.socket.on('logInFailed', () => {
        setResponseText('User credientials are incorrect. Try again.')

        setLoginFail(true)

        // usernameRef.current.clear();
        // passwordRef.current.clear();

        setTimeout(() => {
            setLoginFail(false)
        }, 2000)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: 100, left: 15}}>
                <Button 
                    title='<'
                    color='black'
                    onPress={() => navigation.navigate('Profile', {
                        paramKey: user
                    })}
                />
            </View>
            <View style={{borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5, width: '70%', position: 'absolute', top: 100}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>Log In!</Text>
            </View>

            <View style={{width: '100%', height: 40, borderWidth: 3, borderRadius: 5, borderColor: 'red', backgroundColor: 'lightgrey', display: loginFail === true ? 'flex' : 'none', position: 'absolute', justifyContent: 'center', top: 150}}>
                <Text style={{textAlign: 'center', fontSize: 12}}>{responseText}</Text>
            </View>

            <View style={{width: '100%', marginTop: -300}}>

                <TextInput 
                    value={usernameInput}
                    onChangeText={(username) => liUser.username = username}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    style={styles.inputStyle}
                    placeholder='Username/Email'
                    ref={usernameRef}
                />

                <TextInput 
                    value={passwordInput}
                    onChangeText={(password) => liUser.password = password}
                    style={styles.inputStyle}
                    placeholder='Password'
                    ref={passwordRef}
                    secureTextEntry={!showPassword}
                />

                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    style={{position: 'absolute', top: 130, left: '90%'}}
                    onPress={() => togglePassword()}
                />


            </View>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 400}}>
                <Button 
                    title='Log In'
                    onPress={() => userAttemptsToLogIn()}
                    color='black'
                />
            </View>
        </View>
    )
}

export default LogIn

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        height: 60,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'papayawhip',
        alignSelf: 'center',
        borderBottomWidth: 2.5,
        borderTopWidth: 2.5,
        borderRadius: 3,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        color: 'black'
    }
})