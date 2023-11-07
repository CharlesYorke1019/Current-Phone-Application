import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import style from '../Styles/style';
import BackBttn from '../Components/BackBttnProfileSubPages';

const CreateAccount = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    let usernameHolder;
    let passwordHolder;
    let confirmPasswordHolder;

    let [createdUsername, setCreatedUsername] = useState('');
    let [createdPassword, setCreatedPassword] = useState('');
    let [createdConfirmPassword, setCreatedConfirmPassword] = useState('');

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
        if (createdPassword === createdConfirmPassword) {
            user.socket.emit('userCreatesAccount', createdUsername, createdPassword)
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

        // usernameRef.current.clear();
        // passwordRef.current.clear();
        // confirmPasswordRef.current.clear();

        setTimeout(() => {
            setCreateAccountFail(false)
        }, 2000)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.background}>
                <BackBttn user={user} />

                <View style={{borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5, width: '70%', position: 'absolute', top: 55}}>
                    <Text style={{fontSize: 29, textAlign: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Create Account</Text>
                </View>

                <View style={{width: '100%', marginTop: -220}}>
                    <TextInput
                        value={usernameHolder}
                        onChangeText={(v) => setCreatedUsername(v)}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        style={styles.inputStyle}
                        placeholder='Username'
                        ref={usernameRef}
                        autoCorrect={false}
                    />
                    <TextInput 
                        value={passwordHolder}
                        onChangeText={(v) => setCreatedPassword(v)}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        style={styles.inputStyle}
                        placeholder='Password'
                        ref={passwordRef}
                        secureTextEntry={!showPassword}
                        autoCorrect={false}
                    />

                    <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={{position: 'absolute', top: 130, left: '90%'}}
                        onPress={() => togglePassword()}
                    />

                    <TextInput 
                        value={confirmPasswordHolder}
                        onChangeText={(v) => setCreatedConfirmPassword(v)}
                        style={styles.inputStyle}
                        placeholder='Confirm Password'
                        ref={confirmPasswordRef}
                        secureTextEntry={!showCPassword}
                        autoCorrect={false}
                    />

                    <MaterialCommunityIcons
                        name={showCPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={{position: 'absolute', top: 215, left: '90%'}}
                        onPress={() => toggleCPassword()}
                    />

                </View>

                <View style={{width: '100%', height: 40, borderWidth: 3, borderRadius: 5, borderColor: 'red', backgroundColor: 'lavender', display: createAccountFail === true ? 'flex' : 'none', position: 'absolute', justifyContent: 'center', top: '15%'}}>
                    <Text style={{textAlign: 'center', fontSize: 14, fontFamily: 'Copperplate'}}>{responseText}</Text>
                </View>

                <TouchableOpacity style={style.caSubmitBttn}
                    onPress={() => sendingCreateAccount2Server()}
                >
                    <Text style={style.caSubmitBttnText}>Create Account</Text>
                </TouchableOpacity>
                

            </View>
        </TouchableWithoutFeedback>
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
        color: 'black',
    },

    background: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'
    }
})