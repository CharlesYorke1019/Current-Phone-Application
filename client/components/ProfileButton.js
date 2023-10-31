import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';
import Icon from 'react-native-vector-icons/FontAwesome'

const ProfileButton = ({sentU}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={style.profileBttn}
            onPress={() => navigation.navigate('Profile', {
                paramKey: sentU,
            })}
        >
            <Icon name="user-circle-o" size={35} color="black">

            </Icon>
        </TouchableOpacity>
    )
}

export default ProfileButton