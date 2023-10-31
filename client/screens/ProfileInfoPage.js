import { StyleSheet, Text, View, LogBox, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import EditAccountInfoPage from './EditAccountInfoPage';
import EditUserGameInfo from './EditUserGameInfo';

import BackBttn from '../Components/BackBttnProfileSubPages';

const ProfileInfoPage = ({route}) => {

    // Variables //

    let user = route.params.paramKey

    const navigation = useNavigation();

    let [editAccountInfo, setEditAccountInfo] = useState(false);
    let [editUserGameInfo, setEditUserGameInfo] = useState(false);

    let [initDeleteAccount, setInitDeleteAccount] = useState(false);

    user.atProfilePage = false;


    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const userConfirmsDeleteAccount = () => {
        user.socket.emit('accountDeleted');
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingAccountDeletion', () => {
        user.signsOut();
        navigation.navigate('Home')
    })


    //////////////////////////////////////////////////////////////////

    return ( 
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <View style={{display: editAccountInfo === false && editUserGameInfo === false && initDeleteAccount === false ? 'flex' : 'none', flex: 1}}>
                <BackBttn user={user} />
            </View>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Profile</Text>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 120, display: editAccountInfo === false && editUserGameInfo === false && initDeleteAccount === false ? 'flex' : 'none'}}>
                <View style={{borderBottomWidth: 2 ,width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10, fontFamily: 'Copperplate'}}>User Account Info</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 20}}>Username: {user.accountInfo.username}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 20}}>Password: {user.accountInfo.password}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 20}}>Email: {user.accountInfo.email}</Text>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', width: '30%', alignSelf: 'center', position: 'absolute', top: 160}}
                        onPress={() => setEditAccountInfo(true)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, marginTop: 5, marginBottom: 5}}>Edit</Text>
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{borderWidth: 3, width: '100%', height: '30%', backgroundColor: 'papayawhip', borderRadius: 5, position: 'absolute', top: 400, display: editAccountInfo === false && editUserGameInfo === false && initDeleteAccount === false ? 'flex' : 'none'}}>
                <View style={{borderBottomWidth: 2, width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10, fontFamily: 'Copperplate'}}>User Game Info</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 18}}>Username As Display Name: {user.profileOptions.useUsername}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 18}}>Use Pre-Set Chips: {user.profileOptions.usePreSetChips}</Text>
                    <Text style={{textAlign: 'center', marginTop: 20, fontFamily: 'Copperplate', fontSize: 18}}>Pre-Set Chips Amount: {user.profileOptions.preSetChipAmount}</Text>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', width: '30%', alignSelf: 'center', position: 'absolute', top: 160}}
                        onPress={() => setEditUserGameInfo(true)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, marginTop: 5, marginBottom: 5}}>Edit</Text>
                    </TouchableOpacity>

                </View>
            </View> 

            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: 720, alignSelf: 'center', display: editAccountInfo === false && editUserGameInfo === false && initDeleteAccount === false ? 'flex' : 'none'}}
                onPress={() => setInitDeleteAccount(true)}
            >
                <Text style={{margin: 5, fontFamily: 'Copperplate', fontSize: 20}}>Delete Account</Text>
            </TouchableOpacity>


            <View style={{display: editAccountInfo === true ? 'flex' : 'none', width: '80%', alignSelf: 'center'}}>
                <EditAccountInfoPage user={user} setCurrentView={setEditAccountInfo}/>
            </View>

            <View style={{display: editUserGameInfo === true ? 'flex' : 'none', width: '80%', alignSelf: 'center'}}>
                <EditUserGameInfo user={user} setCurrentView={setEditUserGameInfo} />
            </View>

            <View style={{display: initDeleteAccount === true ? 'flex' : 'none', width: '80%', height: '33%', borderWidth: 2, borderRadius: 5, backgroundColor: 'papayawhip', position: 'absolute', top: '33%', alignSelf: 'center'}}>
                <View style={{width: '85%', alignSelf: 'center', marginTop: 20, marginBottom: 50}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center'}}>Are You Sure You Want To Delete Your Account?</Text>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 16, textAlign: 'center'}}>(This Action Is Irreversible)</Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', marginRight: 20}}
                        onPress={() => userConfirmsDeleteAccount()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, margin: 5}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center'}}
                        onPress={() => setInitDeleteAccount(false)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, margin: 5}}>No</Text>
                    </TouchableOpacity>
                </View>
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