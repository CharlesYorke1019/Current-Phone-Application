import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

const SpecificGroupSettings = ({user, groupName, currentView, setCurrentView}) => {

    // Variables //

    const navigation = useNavigation();

    let [initRemoveMembers, setInitRemoveMembers] = useState(false)

    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('');

    let [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

    let [removeConfirmation, setRemovalConfirmation] = useState(false);

    let [initDeleteGroup, setInitDeleteGroup] = useState(false);

    let membersArr = [];

    ////////////////////////////////////////////////////////////////// 

    // Functions //

    const xOutOfWindow = () => {
        if (readyResponse) {

            setCurrentView(true);
            setReadyResponse(false);
            setInitRemoveMembers(false);

        } else {
            if (initRemoveMembers) {
                setInitRemoveMembers(false);
            } else {
                setCurrentView(false)
            }
        }
    }

    const userInitRemoveMembers = () => {
        setInitRemoveMembers(true);
    }

    const toggleMembersFromGroup = (index) => {
        if (initRemoveMembers) {
            if (!selectedGroupMembers.includes(index)) {
                selectedGroupMembers.push(index);

                setSelectedGroupMembers([
                    ...selectedGroupMembers
                ])
            } else {
                for (let i = 0; i < selectedGroupMembers.length; i++) {
                    if (selectedGroupMembers[i] === index) {
                        selectedGroupMembers.splice(i, 1);
                        setSelectedGroupMembers([
                            ...selectedGroupMembers
                        ])
                    }
                }
            }  
        }
    }

    const userInitSubmitRemovedMembers = () => {
        setRemovalConfirmation(true);
    }

    const userSubmitsRemovedMembers = () => {
        let mArr = [];

        for (let i = 0; i < selectedGroupMembers.length; i++) {
            mArr.push(user.groups[groupName].members[selectedGroupMembers[i]]);
        }

        user.socket.emit('groupMembersRemoved', groupName, mArr);
    }

    const userDeclinesRemoval = () => {
        setRemovalConfirmation(false)
    }

    const resetSelectedMembers = () => {
        setSelectedGroupMembers([])
    }

    const userInitDeleteGroup = () => {
        setInitDeleteGroup(true);
    }

    const userConfirmsDeleteGroup = () => {
        user.socket.emit('groupDeletionConfirmed', groupName);
    }

    const userDeclinesDeleteGroup = () => {
        setInitDeleteGroup(false)
    }

    //////////////////////////////////////////////////////////////////

    // Settings Elements (Removing Players) //

    if (currentView) {
        for (var key in user.groups) {
            if (key === groupName) {
                for (let i = 0; i < user.groups[key].members.length; i++) {
                    if (user.groups[key].members[i] != user.accountInfo.username) {
                        membersArr.push(
                            <TouchableOpacity key={i} style={{ borderWidth: 2, borderRadius: 5, minWidth: '25%', maxHeight: '15%', justifyContent: 'center', marginTop: 10, justifyContent: 'center', alignContent: 'center', backgroundColor: selectedGroupMembers.includes(i) ? 'lightcoral' : 'lavender', marginRight: '2%'}} disabled={!initRemoveMembers}
                                onPress={() => toggleMembersFromGroup(i)}
                            >
                                <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, marginRight: 5, marginLeft: 5, marginBottom: 5, marginTop: 5}}>{user.groups[key].members[i]}</Text>
                            </TouchableOpacity>
                        )
                    }
                }
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('groupMembersRemovalConfirmed', (groupInfo) => {

        setReadyResponse(true);
        setResponseText('Group Members Have Been Removed!');

        user.updateGroupInfo(groupInfo);
    })

    user.socket.on('sendingBackGroupDeletion', (groups) => {
        user.updateGroupsAll(groups)

        navigation.navigate('Profile', {
            paramKey: user
        })
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'papayawhip', borderRadius: 5}}>
            <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: 0, width: '100%', display: initDeleteGroup === false ? 'flex' : 'none'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>Back</Text>
            </TouchableOpacity>

            <View style={{display: initRemoveMembers === false && initDeleteGroup === false ? 'flex' : 'none', height: '90%'}}>

                <TouchableOpacity style={{borderWidth: 3, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: '15%', borderRadius: 5}}
                    onPress={() => userInitRemoveMembers()}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center', marginLeft: 5, marginRight: 5}}>Remove Members</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: '35%'}}
                    onPress={() => userInitDeleteGroup()} 
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center', marginLeft: 5, marginRight: 5}}>Disband Group</Text>
                </TouchableOpacity>
            </View>

            <View style={{display: initRemoveMembers === true ? 'flex' : 'none', height: '90%'}}>

                <View style={{flex: 1, display: readyResponse === false && removeConfirmation === false ? 'flex' : 'none'}}>
                    <View style={{width: '85%', alignSelf: 'center', position: 'absolute', top: '10%'}}>
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 22}}>Select The Group Members You Wish To Remove</Text>
                    </View>

                    <View style={{borderWidth: 3, borderRadius: 5, width: '90%', height: '50%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '6%', position: 'absolute', top: '30%'}}>
                        {membersArr}
                    </View>

                    <TouchableOpacity style={{borderWidth: 2, backgroundColor: 'lavender', width: '45%', alignSelf: 'center', borderRadius: 5, position: 'absolute', top: '85%'}}
                        onPress={() => resetSelectedMembers()}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, margin: '2%'}}>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, backgroundColor: 'lavender', width: '45%', alignSelf: 'center', borderRadius: 5, position: 'absolute', top: '95%'}}
                        onPress={() => userInitSubmitRemovedMembers()}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, margin: '2%'}}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flex: 1, display: removeConfirmation === true && readyResponse === false ? 'flex' : 'none'}}>
                    <View style={{width: '85%', alignSelf: 'center', position: 'absolute', top: '10%'}}>
                        <Text style={{fontFamily: 'Copperplate', fontSize: 22, textAlign: 'center'}}>Are You Sure You Want To Remove These Members From The Group?</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignSelf: 'center', width: '90%', position: 'absolute', top: '40%', left: '16%'}}>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '35%', marginRight: 10}}
                            onPress={() => userSubmitsRemovedMembers()}
                        >
                            <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, margin: '2%'}}>
                                Yes
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '35%'}}
                            onPress={() => userDeclinesRemoval()}
                        >
                            <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20, margin: '2%'}}>
                                No
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <View style={{flex: 1, display: readyResponse === true ? 'flex' : 'none'}}>
                    <View style={{width: '85%', alignSelf: 'center', position: 'absolute', top: '12%'}}>
                        <Text style={{fontFamily: 'Copperplate', fontSize: 20, textAlign: 'center'}}>{responseText}</Text>
                    </View>
                </View>

            </View>

            <View style={{display: initDeleteGroup === true ? 'flex' : 'none', height: '90%'}}>
                <View style={{width: '95%', alignSelf: 'center', position: 'absolute', top: '20%'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 30, textAlign: 'center'}}>Are You Sure You Want To Delete This Group?</Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'center', position: 'absolute', top: '45%'}}>
                    <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', justifyContent: 'center', marginRight: 10}}
                        onPress={() => userConfirmsDeleteGroup()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, textAlign: 'center', margin: 3}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', justifyContent: 'center'}}
                        onPress={() => userDeclinesDeleteGroup()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, textAlign: 'center', margin: 3}}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default SpecificGroupSettings;