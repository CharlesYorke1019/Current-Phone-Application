import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CreateAccount = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey
    
    const caUser = {
        chosenUN: null,
        chosenP: null,
        confirmChosenP: null
    }

    let usernameInput;
    let passwordInput;
    let confirmPasswordInput;

    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    let [createAccountFail, setCreateAccountFail] = useState(false)
    let [responseText, setResponseText] = useState('');

    let [showPassword, setShowPassword] = useState(false);
    let [showCPassword, setShowCPassword] = useState(false);

    //////////////////////////////////////////////////////////////////

    // Functions //

    const sendingCreateAccount2Server = () => {
        if (caUser.chosenP === caUser.confirmChosenP) {
            user.socket.emit('userCreatesAccount', (caUser))
        } else {
            setResponseText('Passwords do not match. Please try again.')
            setCreateAccountFail(true)

            passwordRef.current.clear();
            confirmPasswordRef.current.clear();

            setTimeout(() => {
                setCreateAccountFail(false)
            }, 2000)
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleCPassword = () => {
        setShowCPassword(!showCPassword);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('userAccountValid', () => {
        navigation.navigate('LogIn', {
            paramKey: user,
        })
    })

    user.socket.on('userAccountInvalid', () => {
        setResponseText('Username already exists. Please try a different one.')

        setCreateAccountFail(true)

        usernameRef.current.clear();
        passwordRef.current.clear();
        confirmPasswordRef.current.clear();

        setTimeout(() => {
            setCreateAccountFail(false)
        }, 2000)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={styles.background}>

            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: 100, left: 15}}>
                    <Button 
                        title='<'
                        color='black'
                        onPress={() => navigation.navigate('Profile', {
                            paramKey: user
                        })}
                    />
            </View>

            <View style={{borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5, width: '70%', marginBottom: 300, position: 'absolute', top: 100}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>Create Account</Text>
            </View>

            <View style={{width: '100%', marginTop: -200}}>
                <TextInput
                    value={usernameInput}
                    onChangeText={(username) => caUser.chosenUN = username}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    style={styles.inputStyle}
                    placeholder='Username'
                    ref={usernameRef}
                />
                <TextInput 
                    value={passwordInput}
                    onChangeText={(password) => caUser.chosenP = password}
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
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

                <TextInput 
                    value={confirmPasswordInput}
                    onChangeText={(password) => caUser.confirmChosenP = password}
                    style={styles.inputStyle}
                    placeholder='Confirm Password'
                    ref={confirmPasswordRef}
                    secureTextEntry={!showCPassword}
                />

                <MaterialCommunityIcons
                    name={showCPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    style={{position: 'absolute', top: 215, left: '90%'}}
                    onPress={() => toggleCPassword()}
                />

            </View>

            <View style={{width: '100%', height: 40, borderWidth: 3, borderRadius: 5, borderColor: 'red', backgroundColor: 'lightgrey', display: createAccountFail === true ? 'flex' : 'none', position: 'absolute', justifyContent: 'center', top: 150}}>
                <Text style={{textAlign: 'center', fontSize: 12}}>{responseText}</Text>
            </View>

            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 500}}>
                <Button 
                    title = 'Create Account'
                    onPress={() => sendingCreateAccount2Server()}
                    color='black'
                />
            </View>


        </View>
    )
}

export default CreateAccount

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
    },

    background: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'
    }
})