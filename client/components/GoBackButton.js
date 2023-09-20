import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const GoBackButton = ({sentU, sentS}) => {
    const navigation = useNavigation();

    return (
        <View style={{backgroundColor:'lightgrey', position: 'absolute', top: 50, borderWidth: 1, borderRadius: 3, borderColor: 'black'}}>
            <Button 
                title='Go Back'
                onPress={() => navigation.navigate('Profile', {
                    paramKey: sentU,
                    socketKey: sentS
                })}
                color='black'
            />
        </View>
    )
}

export default GoBackButton