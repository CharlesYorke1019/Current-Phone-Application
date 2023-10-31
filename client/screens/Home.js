import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import ProfileButton from '../Components/ProfileButton';
import User from '../Models/UserModel';
import style from '../Styles/style';

const io = require('socket.io-client');

const Home = () => {

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const socket = io("http://192.168.1.75:5000")

    const navigation = useNavigation();

    const [user, setUser] = useState(new User(makeId(30), 'guest', false, {}, false, {}, socket))

    user.changeCurrentPage('Home');

    user.socket.on('userConnects', () => {
        user.socket.emit('confirmedUserConnects', user.socket.id); 
    })

    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <ProfileButton sentU={user} />
            <View style={{alignContent: 'center', justifyContent: 'center', borderWidth: 4, width: '100%', height: '75%', borderRadius: 5, backgroundColor: 'papayawhip', marginTop: 20}}>
                <Text style={style.appName}>Pocket Chips</Text>
                <TouchableOpacity style={style.createGameBttn}
                    onPress={() => navigation.navigate('CreateGame', {
                        paramKey: user
                    })}
                >
                    <Text style={style.buttonTexts}>Create Game</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.joinGameBttn}
                    onPress={() => navigation.navigate('JoinGame', {
                        paramKey: user
                    })}
                >
                    <Text style={style.buttonTexts}>Join Game</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Home