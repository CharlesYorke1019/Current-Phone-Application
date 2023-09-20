import { Button, StyleSheet, Text, View, LogBox, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import GoHomeButton from '../Components/GoHomeButton';

const ProfileInfoPage = ({route}) => {
    let user = route.params.paramKey

    const navigation = useNavigation();

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    return ( 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 55, left: 10}}>
                <Button 
                    title='<'
                    color='black'
                    onPress={() => navigation.navigate('Profile', {
                        paramKey: user
                    })}
                />
            </View>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center'}}>Account Info</Text>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 120}}>
                <View style={{borderBottomWidth: 2 ,width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10}}>User Account Info</Text>
                </View>
            </View>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 400}}>
                <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10}}>User Game Info</Text>
            </View> 

            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 700, alignSelf: 'center'}}>
                    <Button 
                        title='Delete Account'
                        color='black'
                    />
            </View>

        </View>
    )

}

export default ProfileInfoPage;

const styles = StyleSheet.create({
    inputStyle: {
        width: '50%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6',
        borderWidth: 2,
        borderRadius: 5, 
        alignSelf: 'center',
    }, 
})