import { Text, View, LogBox, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import GoBackButton from '../Components/GoBackButton';
import style from '../Styles/style';

const ProfilePage = ({route}) => {

    // Variables //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const navigation = useNavigation();
    let user = route.params.paramKey

    let [initSignOut, setInitSignOut] = useState(false)

    user.atProfilePage = true;

    //////////////////////////////////////////////////////////////////
 
    // Functions //

    const userInitSignOut = () => {
        setInitSignOut(true)
    }

    const userConfirmsSignOut = () => {
        user.socket.emit('userConfirmsSignOut');
    }

    user.deleteIntereactedAlerts();

    
    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingFriendRequestToReciever', (inviteInfo) => {
        user.addAlert(inviteInfo)
    })

    user.socket.on('sendingGroupInvite', (inviteInfo) => {
        user.addAlert(inviteInfo)
    })

    user.socket.on('friendRequestAcceptedConfirmed', (alertInfo, index) => {
        user.removeAlert(alertInfo, index)
    })

    user.socket.on('userAcceptedFriendRequest', (username) => {
        user.addFriendToList(username);
    })

    user.socket.on('sendingGroupInfoAfterInviteAccepted', (groupInfo, alertInfo, index) => {
        user.addGroup(groupInfo);
        user.removeAlert(alertInfo, index);
    })

    user.socket.on('sendingBackRequestDecline', (alertInfo, index) => {
        
        user.removeAlert(alertInfo, index)
        
    })

    user.socket.on('sendingGameInvite', (inviteInfo) => {
        user.addAlert(inviteInfo);
    }) 

    user.socket.on('sendingBackSignOutConfirmation', () => {
        user.signsOut();
        navigation.navigate('Home');
    })

    user.socket.on('sendingGroupGameInvite', (inviteInfo) => {
        user.addAlert(inviteInfo);
    })

    user.socket.on('connectedUserDeletedAccount', (userInfo) => {
        user.setInfo('deletion', userInfo)
    })

    user.socket.on('sendingBackUpdateGroupInfo', (groupInfo) => {
        user.updateGroupInfo(groupInfo);
    })

    user.socket.on('removedFromGroup', (groups) => {
        user.updateGroupsAll(groups);
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <GoBackButton user={user} />
            {user.loggedIn ? (
                <View style={{width: '85%', height: '70%', borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5}}>
                    <View style={{borderBottomWidth: 3, marginTop: 20, marginBottom: 50}}>
                        <Text style={{fontSize: 30, textAlign: 'center', marginBottom: 5, fontFamily: 'Copperplate'}}>{user.accountInfo.username}</Text>
                    </View>

                    <TouchableOpacity style={style.profileInfoBttn}
                        onPress={() => navigation.navigate('ProfileInfoPage', {
                            paramKey: user
                        })}
                    >
                        <Text style={style.profileBttnText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.friendsBttn}
                        onPress={() => navigation.navigate('FriendsPage', {
                            paramKey: user
                        })}
                    >
                        <Text style={style.profileBttnText}>Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.groupsBttn}
                        onPress={() => navigation.navigate('GroupsPage', {
                            paramKey: user
                        })}
                    >
                        <Text style={style.profileBttnText}>Groups</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.alertsBttn}
                        onPress={() => navigation.navigate('AlertsPage', {
                            paramKey: user
                        })}
                    >
                        <Text style={style.profileBttnText}>Alerts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.signOutBttn}
                        onPress={() => userInitSignOut()}
                    >
                        <Text style={style.profileBttnText}>Sign Out</Text>
                    </TouchableOpacity>

                    <View style={{display: initSignOut === true ? 'flex' : 'none', position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', width: '80%', height: '45%', top: '30%'}}>
                        <Text style={{textAlign: 'center', marginBottom: 40, fontSize: 25, fontFamily: 'Copperplate'}}>Are You Sure You Want To Sign Out?</Text>
                        <View style={{flexDirection: 'row'}}>
                            
                            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', marginRight: 20, justifyContent: 'center', width: '25%'}}
                                onPress={() => userConfirmsSignOut()}
                            >
                                <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', justifyContent: 'center', width: '25%'}}
                                onPress={() => setInitSignOut(false)}
                            >
                                <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>No</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
            ) : (
                <View style={{position: 'absolute', top: 200, width: '100%'}}>
                    <View style={{borderWidth: 3, backgroundColor: 'papayawhip', borderRadius: 5, width: '100%'}}>
                        <Text style={style.headerText}>You Are Not Logged In!</Text>
                        <TouchableOpacity style={style.createAccountBttn}
                            onPress={() => navigation.navigate('CreateAccount', {
                                paramKey: user,
                            })}
                        >
                            <Text style={style.createAccountBttnText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.logInBttn}
                            onPress={() => navigation.navigate('LogIn', {
                                paramKey: user,
                            })}
                        >
                            <Text style={style.logInBttnText}>Log In</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            )}


        </View>
    )
}

export default ProfilePage