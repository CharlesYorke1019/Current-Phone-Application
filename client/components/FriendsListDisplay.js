import { Text, View } from 'react-native';
import React from 'react';

const FriendsListDisplay = ({username}) => {

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignItems: 'center', maxWidth: '50%', height: '10%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}>
            <Text style={{textAlign: 'center', fontSize: 20, marginRight: 20, marginLeft: 20}}>{username}</Text>
        </View>
    )

}

export default FriendsListDisplay