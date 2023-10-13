import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';

const GoBackButton = ({user}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={style.goBackBttn}
            onPress={() => navigation.navigate(`${user.currentPage}`, {
                paramKey: user,
            })}
        >
            <Text style={style.goBackBttnText}>Back</Text>
        </TouchableOpacity>
    )
}

export default GoBackButton