import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const GoHomeButton = ({user}) => {
    const navigation = useNavigation();

    const sendHome = () => {
        user.changeCurrentPage('Home')
        navigation.navigate('Home')
    }

    return (
        <View style={{backgroundColor:'lightgrey', position: 'absolute', top: 55, borderWidth: 3, borderRadius: 5, borderColor: 'black'}}>
            <Button 
                title='Home'
                onPress={() => sendHome()}
                color='black'
            />
        </View>
    )
}

export default GoHomeButton

// const styles = StyleSheet.create({
//     buttonStyle: {
//         position: 'absolute',
//         top: 10
        
//     }
// })