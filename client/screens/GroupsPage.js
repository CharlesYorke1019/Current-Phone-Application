import { Button, Text, View, LogBox, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import CreatingGroupPage from './CreatingGroupPage';
import SpecificGroupView from './SpecificGroupView';
import style from '../Styles/style';

const GroupsPage = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey
    let [creatingGroupInit, setCreatingGroupInit] = useState(false);
    let [viewingGroup, setViewingGroup] = useState(false);
    let [specificGroupName, setSpecificGroupName] = useState('');
    let [specificGroupMembers, setSpecificGroupMembers] = useState('')

    let groupsArr = [];

    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const setSpecificGroupView = (name) => {
        setSpecificGroupName(name);
        setViewingGroup(true);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('groupInviteHasBeenAccepted', (groupInfo) => {
        user.updateGroupInfo(groupInfo);
    })

    //////////////////////////////////////////////////////////////////

    // Group Page Elements //

    for (let i = 0; i < user.groupNames.length; i++) {
        groupsArr.push(
            <TouchableOpacity key={i} style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignItems: 'center', maxWidth: '30%', height: '10%', justifyContent: 'center', marginLeft: 10, marginRight: 10, marginTop: 10}}
                onPress={() => setSpecificGroupView(user.groupNames[i])}
            >
                <Text style={{marginRight: 10, marginLeft: 10, textAlign: 'center', fontFamily: 'Copperplate', fontSize: 19}}>{user.groupNames[i]}</Text>
            </TouchableOpacity>
        )
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Groups</Text>
            <View style={{flex: 1, display: creatingGroupInit === false && viewingGroup === false ? 'flex' : 'none', alignItems: 'center'}}>
                <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: 56, left: -170}}>
                    <Button 
                        title='<'
                        color='black'
                        onPress={() => navigation.navigate('Profile', {
                            paramKey: user
                        })}
                    />
                </View>

                <TouchableOpacity style={style.createGroupBttn}
                    onPress={() => setCreatingGroupInit(true)}
                >
                    <Text style={style.createGroupBttnText}>Create Group</Text>
                </TouchableOpacity>


                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 180, width: '95%', height: '75%', backgroundColor: 'papayawhip', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                   
                    {groupsArr}

                </View>

            </View>

            <View style={{flex: 1, display: creatingGroupInit === true ? 'flex' : 'none', width: '80%', marginTop: 160}}>
                <CreatingGroupPage setCreatingGroup={setCreatingGroupInit} user={user} />
            </View>

            <View style={{flex: 1, display: viewingGroup === true ? 'flex' : 'none', width: '80%', marginTop: 120}}>    
                <SpecificGroupView user={user} currentView={viewingGroup} setDisplayOpen={setViewingGroup} groupName={specificGroupName} />
            </View>


        </View>
    )
}

export default GroupsPage