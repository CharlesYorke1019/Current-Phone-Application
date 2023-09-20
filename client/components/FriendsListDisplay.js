import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const FriendsListDisplay = ({username}) => {

    return (
        <View style={{borderWidth: 2, backgroundColor: 'lightgrey', marginLeft: 5, marginRight: 5, marginTop: 5, width: 100, height: 20}}>
            <Text style={{textAlign: 'center', fontSize: 12}}>{username}</Text>
        </View>
    )

}

export default FriendsListDisplay