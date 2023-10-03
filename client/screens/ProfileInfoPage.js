import { Button, StyleSheet, Text, View, LogBox } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import EditAccountInfoPage from './EditAccountInfoPage';
import EditUserGameInfo from './EditUserGameInfo';

const ProfileInfoPage = ({route}) => {

    // Variables //

    let user = route.params.paramKey

    const navigation = useNavigation();

    let [editAccountInfo, setEditAccountInfo] = useState(false);
    let [editUserGameInfo, setEditUserGameInfo] = useState(false);


    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    //////////////////////////////////////////////////////////////////

    return ( 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 55, left: 10, display: editAccountInfo === false && editUserGameInfo === false ? 'flex' : 'none'}}>
                <Button 
                    title='<'
                    color='black'
                    onPress={() => navigation.navigate('Profile', {
                        paramKey: user
                    })}
                />
            </View>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center'}}>Account Info</Text>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 120, display: editAccountInfo === false && editUserGameInfo === false ? 'flex' : 'none'}}>
                <View style={{borderBottomWidth: 2 ,width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10}}>User Account Info</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Username: {user.accountInfo.username}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Password: {user.accountInfo.password}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Email: {user.accountInfo.email}</Text>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 160}}>
                        <Button 
                            title='edit'
                            color='black'
                            onPress={() => setEditAccountInfo(true)}
                        />
                    </View>
                </View>

            </View>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 400, display: editAccountInfo === false && editUserGameInfo === false ? 'flex' : 'none'}}>
                <View style={{borderBottomWidth: 2, width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10}}>User Game Info</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Use Username As Display Name: {user.profileOptions.useUsername}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Use Pre-Set Chips: {user.profileOptions.usePreSetChips}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20}}>Pre-Set Chips Amount: {user.profileOptions.preSetChipAmount}</Text>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '40%', alignSelf: 'center', position: 'absolute', top: 160}}>
                        <Button 
                            title='edit'
                            color='black'
                            onPress={() => setEditUserGameInfo(true)}
                        />
                    </View>
                </View>
            </View> 

            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', position: 'absolute', top: 700, alignSelf: 'center', display: editAccountInfo === false && editUserGameInfo === false ? 'flex' : 'none'}}>
                    <Button 
                        title='Delete Account'
                        color='black'
                    />
            </View>

            <View style={{display: editAccountInfo === true ? 'flex' : 'none', width: '80%'}}>
                <EditAccountInfoPage user={user} setCurrentView={setEditAccountInfo}/>
            </View>

            <View style={{display: editUserGameInfo === true ? 'flex' : 'none', width: '80%'}}>
                <EditUserGameInfo user={user} setCurrentView={setEditUserGameInfo} />
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