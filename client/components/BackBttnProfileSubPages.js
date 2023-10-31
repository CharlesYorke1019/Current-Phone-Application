import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Icon  from 'react-native-vector-icons/Entypo'


const BackBttn = ({user}) => {

    const navigation = useNavigation();

    const sendUserToProfilePage = () => {
        navigation.navigate('Profile', {
            paramKey: user
        })
    }

    return (
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: 56, left: '3.5%', height: '5.2%', justifyContent: 'center', width: '10%', alignItems: 'center'}}
            onPress={() => sendUserToProfilePage()}
        >
            <Icon name="back" size={24}></Icon>
        </TouchableOpacity>
    )


}

export default BackBttn