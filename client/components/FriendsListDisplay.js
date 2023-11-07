import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const FriendsListDisplay = ({username, cb1, cb2}) => {

    const setInfo = () => {
        cb2(username);
        cb1();
    }

    return (
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignItems: 'center', height: '2%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}
            onPress={() => setInfo()}
        >
            <Text style={{textAlign: 'center', fontSize: 24, marginRight: 20, marginLeft: 20, fontFamily: 'Copperplate'}}>{username}</Text>
        </TouchableOpacity>

    )

}

export default FriendsListDisplay