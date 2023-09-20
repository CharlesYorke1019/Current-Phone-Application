import { SafeAreaView, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const ProfileButton = ({sentU}) => {
    const navigation = useNavigation();

    return (
        <View style = {{backgroundColor:'lightgrey', position: 'absolute', top: 55, left: 275, borderWidth: 3, borderRadius: 5, borderColor: 'black'}}>
            <Button 
                title='Profile'
                onPress={() => navigation.navigate('Profile', {
                    paramKey: sentU,
                })}
                color='black'
            />
        </View>
    )
}

export default ProfileButton