import { Button, Text, View, LogBox, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import CreatingGroupPage from './CreatingGroupPage';
import SpecificGroupView from './SpecificGroupView';

const GroupsPage = ({route}) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const navigation = useNavigation();
    let user = route.params.paramKey

    let [creatingGroupInit, setCreatingGroupInit] = useState(false);
    let [viewingGroup, setViewingGroup] = useState(false);
    let [specificGroupName, setSpecificGroupName] = useState('');
    let [specificGroupMembers, setSpecificGroupMembers] = useState('')


    user.socket.on('groupInviteHasBeenAccepted', (groupInfo) => {
        user.updateGroupInfo(groupInfo);
    })

    const setSpecificGroupView = (name) => {
        setSpecificGroupName(name);
        setViewingGroup(true);
    }

    let groupsArr = [];

    for (let i = 0; i < user.groupNames.length; i++) {
        groupsArr.push(
            <TouchableOpacity key={i} style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignItems: 'center', maxWidth: '30%', height: '10%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}
                onPress={() => setSpecificGroupView(user.groupNames[i])}
            >
                <Text style={{marginRight: 10, marginLeft: 10, textAlign: 'center'}}>{user.groupNames[i]}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center'}}>Groups</Text>
            <View style={{flex: 1, display: creatingGroupInit === false && viewingGroup === false ? 'flex' : 'none', alignItems: 'center'}}>
                <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: 56, left: -170}}>
                    <Button 
                        title='<'
                        color='black'
                        onPress={() => navigation.navigate('Profile', {
                            paramKey: user
                        })}
                    />
                </View>
                <View style={{backgroundColor:'lightgrey', position: 'absolute', top: 120, borderWidth: 3, borderRadius: 5, borderColor: 'black'}}>
                    <Button 
                        title='Create Group'
                        color='black'
                        onPress={() => setCreatingGroupInit(true)}
                    />
                </View>


                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 180, width: '95%', height: '75%', backgroundColor: 'papayawhip', flexDirection: 'row', flexWrap: 'wrap'}}>
                   
                    {groupsArr}

                </View>

            </View>

            <View style={{flex: 1, display: creatingGroupInit === true ? 'flex' : 'none', width: '80%', marginTop: 160}}>
                <CreatingGroupPage creatingGroupInit={creatingGroupInit} setCreatingGroup={setCreatingGroupInit} user={user} />
            </View>

            <View style={{flex: 1, display: viewingGroup === true ? 'flex' : 'none', width: '80%', marginTop: 120}}>    
                <SpecificGroupView user={user} currentView={viewingGroup} setDisplayOpen={setViewingGroup} groupName={specificGroupName} />
            </View>


        </View>
    )

}

export default GroupsPage