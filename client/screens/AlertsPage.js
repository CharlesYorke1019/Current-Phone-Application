import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../Components/GoBackButton';

const AlertsPage = ({route}) => {

    const navigation = useNavigation();
    let user = route.params.paramKey;

    let alertsArr = [];
    let [finalAlerts, setFinalAlerts] = useState(user.friendRequests);
    let [pendingAlerts, setPendingAlerts] = useState(true);


    const requestAccepted = (cb, alertInfo, index) => {
        cb(false);

        if (alertInfo.type === 'friend_request') {
            user.addFriendToList(alertInfo.sender)
            user.socket.emit('requestAccepted', 'fRQ', alertInfo.sender, index);
        } else if (alertInfo.type === 'group_request') {
            user.socket.emit('groupInviteAccepted', alertInfo.sender, alertInfo.groupName, index)
        }
    }

    const requestDeclines = (cb, type, index) => {
        cb(false)
        user.socket.emit('requestDeclined', type, index);
    }

    for (let i = 0; i < user.alerts.length; i++) {
        let [t, setT] = useState(true)
        if (user.alerts[i].type === 'friend_request') {
            alertsArr.push(
                <View key={i} style={{width: '100%', height: '10%', borderBottomWidth: 3, borderRadius: 5, alignContent: 'center', justifyContent: 'center', marginBottom: 5, display: t === true ? 'flex' : 'none'}}>
                    <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>{user.alerts[i].sender} has sent a friend request!</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '20%'}}
                            onPress={() => requestAccepted(setT, user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center'}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '20%'}}>
                            <Text style={{textAlign: 'center'}}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )   
        } else if (user.alerts[i].type === 'group_request') {
            alertsArr.push(
                <View key={i} style={{width: '100%', height: '10%', borderBottomWidth: 3, borderRadius: 5, alignContent: 'center', justifyContent: 'center', marginBottom: 5, display: t === true ? 'flex' : 'none'}}>
                    <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 10}}>{user.alerts[i].sender} has sent a group invite!</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '20%'}}
                            onPress={() => requestAccepted(setT, user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center'}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '20%'}}>
                            <Text style={{textAlign: 'center'}}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )  
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center'}}>Alerts</Text>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: 56, left: 10}}>
                <Button 
                    title='<'
                    color='black'
                    onPress={() => navigation.navigate('Profile', {
                        paramKey: user
                    })}
                />
            </View>

            <View style={{borderWidth: 3, borderRadius: 5, width: '95%', height: '75%', position: 'absolute', top: 130, backgroundColor: 'papayawhip', flex: 1, flexDirection: 'column'}}>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 20, display: pendingAlerts === false ? 'flex' : 'none'}}>No Alerts!</Text>
                {alertsArr}
            </View>

        </View>
    )

}

export default AlertsPage