import { Button, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const AlertsPage = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey;
    user.atProfilePage = false

    let alertsArr = [];
    let [pendingAlerts, setPendingAlerts] = useState();

    let [interactedArr, setInteractedArr] = useState([]);

    let [responseText, setResponseText] = useState('');

    //////////////////////////////////////////////////////////////////

    // Functions //

    useEffect(() => {
        if (user.alerts.length === 0) {
            setPendingAlerts(false)
        } else {
            setPendingAlerts(true)
        }


    })

    const requestAccepted = (alertInfo, index) => {
        
        user.setAlertInteracted(alertInfo);

        if (alertInfo.type === 'friend_request') {
            user.addFriendToList(alertInfo.sender)
            user.socket.emit('friendRequestAccepted', alertInfo, index, user.alerts);
        } else if (alertInfo.type === 'group_invite') {
            user.socket.emit('groupRequestAccepted', alertInfo, index, user.alerts)
        } else if (alertInfo.type === 'game_invite') {
            user.socket.emit('gameInviteAccepted', alertInfo, index)
        }

        setResponseText('Invite Accepted!');

        interactedArr.push(index);
        setInteractedArr([
            ...interactedArr
        ])
    }

    const requestDeclined = (alertInfo, index) => {
        setResponseText('Invite Declined.')

        user.socket.emit('requestDeclined', alertInfo, index);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingUserToGameAfterAccept', (alertInfo, index) => {
        user.removeAlert(alertInfo, index);
        navigation.navigate('PlayerInGameDisplays', {
            paramKey: user
        })
    })

    //////////////////////////////////////////////////////////////////

    // Alert Elements //

    for (let i = 0; i < user.alerts.length; i++) {
        if (user.alerts[i].type === 'friend_request') {
            alertsArr.push(
                <View key={i} style={{width: '100%', minHeight: '10%', borderBottomWidth: 3, borderRadius: 5, alignContent: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <Text style={{textAlign: 'center', fontSize: 17, marginBottom: 10, fontFamily: 'Copperplate'}}>{ !interactedArr.includes(i) ?  `${user.alerts[i].sender} has sent a friend request!` : `${responseText}`}</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center', display: !interactedArr.includes(i) ? 'flex' : 'none'}}>
                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '20%', marginRight: 10, justifyContent: 'center'}}
                            onPress={() => requestAccepted(user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '22%', justifyContent: 'center'}}
                            onPress={() => requestDeclined(user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )   
        } 
        if (user.alerts[i].type === 'group_invite') {
            alertsArr.push(
                // ${responseText}
                <View key={i} style={{width: '100%', height: '10%', borderBottomWidth: 3, borderRadius: 5, alignContent: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <Text style={{textAlign: 'center', fontSize: 17, marginBottom: 10, fontFamily: 'Copperplate'}}>{ !interactedArr.includes(i) ? `${user.alerts[i].sender} has sent a group invite!` : `${responseText}`}</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center', display: !interactedArr.includes(i) ? 'flex' : 'none'}}>
                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '20%', justifyContent: 'center', marginRight: 10}}
                            onPress={() => requestAccepted(user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '22%', justifyContent: 'center'}}
                            onPress={() => requestDeclined(user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )  
        } 
        if (user.alerts[i].type === 'game_invite') {
            alertsArr.push(
                <View key={i} style={{width: '100%', height: '10%', borderBottomWidth: 3, borderRadius: 5, alignContent: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <Text style={{textAlign: 'center', fontSize: 17, marginBottom: 10, fontFamily: 'Copperplate'}}>{ `${user.alerts[i].sender} has invited you to a game!`}</Text>
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '20%', justifyContent: 'center', marginRight: 10}}
                            onPress={() => requestAccepted(user.alerts[i], i,)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '20%', justifyContent: 'center'}}
                            onPress={() => requestDeclined(user.alerts[i], i)}
                        >
                            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', margin: 3}}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )  
        }
        
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Alerts</Text>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: 56, left: 10}}>
                <Button 
                    title='<'
                    color='black'
                    onPress={() => navigation.navigate('Profile', {
                        paramKey: user
                    })}
                />
            </View>

            <ScrollView style={{borderWidth: 3, borderRadius: 5, width: '95%', height: '75%', position: 'absolute', top: 130, backgroundColor: 'papayawhip', flex: 1, flexDirection: 'column'}} scrollEnabled={pendingAlerts}>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 22, display: pendingAlerts === false ? 'flex' : 'none', fontFamily: 'Copperplate'}}>No Alerts!</Text>
                {alertsArr}

                <View style={{marginBottom: 900}}>

                </View>
            </ScrollView>

        </View>
    )

}

export default AlertsPage