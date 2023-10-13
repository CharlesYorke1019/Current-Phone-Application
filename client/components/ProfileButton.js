import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';

const ProfileButton = ({sentU}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={style.profileBttn}
            onPress={() => navigation.navigate('Profile', {
                paramKey: sentU,
            })}
        >
            <Text style={style.profileBttnText}>Profile</Text>
        </TouchableOpacity>
    )
}

export default ProfileButton