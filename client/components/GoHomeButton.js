import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'

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
            <Icon name="home" size={42}>

            </Icon>
        </TouchableOpacity>
        
    )
}

export default GoHomeButton
