import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';

const GoHomeButton = ({user}) => {
    const navigation = useNavigation();

    const sendHome = () => {
        user.changeCurrentPage('Home')
        navigation.navigate('Home')
    }

    return (
        <TouchableOpacity style={style.homeBttn}
            onPress={() => sendHome()}
        >
            <Text style={style.homeBttnText}>Home</Text>
        </TouchableOpacity>
        
    )
}

export default GoHomeButton
