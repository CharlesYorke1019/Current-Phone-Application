import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const GoBackButton = ({user, gameObj}) => {
    const navigation = useNavigation();


    return (
        <View style={{backgroundColor:'lightgrey', position: 'absolute', top: 55, borderWidth: 3, borderRadius: 5, borderColor: 'black'}}>
            <Button 
                title='Back'
                onPress={() => navigation.navigate(`${user.currentPage}`, {
                    paramKey: user,
                })}
                color='black'
            />
        </View>
    )
}

export default GoBackButton