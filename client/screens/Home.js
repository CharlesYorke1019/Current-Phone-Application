import { SafeAreaView, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import ProfileButton from '../Components/ProfileButton';
import User from '../Models/UserModel';

const io = require('socket.io-client');


const Home = () => {
    const socket = io("http://192.168.1.76:5000")

    const navigation = useNavigation();

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const [user, setUser] = useState(new User(makeId(30), 'guest', false, {}, false, {}, socket))

    user.socket.on('userConnects', () => {
        user.socket.emit('confirmedUserConnects', (user.socket.id));  
    })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <ProfileButton sentU={user} />
            <View style={{alignContent: 'center', justifyContent: 'center', position: 'absolute', top: 200, borderWidth: 4, width: '100%', borderRadius: 5, backgroundColor: 'papayawhip'}}>
                <Text style={styles.headerStyle}>Pocket Chips</Text>
                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', backgroundColor: 'lightgrey',alignSelf: 'center',width: 200, alignItems: 'center', marginBottom: 40}}>
                    <Button 
                        title='Create Game'
                        color='black'
                        onPress={() => navigation.navigate('CreateGame', {
                            paramKey: user
                        })}
                    />
                    
                </View>
                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', backgroundColor: 'lightgrey', alignSelf: 'center', width: 200, alignItems: 'center', marginBottom: 20}}>
                    <Button 
                        title='Join Game'
                        color='black'
                        onPress={() => navigation.navigate('JoinGame', {
                            paramKey: user
                        })}
                    />
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6'
    },

    headerStyle: {
        fontSize: 70,
        alignSelf: 'center',
        marginBottom: 60,
        textAlign: 'center',
        marginTop: 10
    },

    profileStyle: {
        color: 'black',
        borderColor: 'black',
        position: 'absolute',
        top: 10
    }
})