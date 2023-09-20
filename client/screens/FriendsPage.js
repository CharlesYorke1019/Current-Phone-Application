import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import GoBackButton from '../Components/GoBackButton';
import AddingFriendsPage from './AddingFriendsPage';
import FriendsListDisplay from '../Components/FriendsListDisplay';

const FriendsPage = ({route}) => {
    const navigation = useNavigation();
    let user = route.params.paramKey

    let [addingFriendInit, setAddingFriendInit] = useState(false)
    let friendsArr = [];

    for (let i = 0; i < user.friendsList.length; i++) {
        friendsArr.push(
            <FriendsListDisplay key={i} username={user.friendsList[i]} />
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center'}}>Friends</Text>
            <View style={{display: addingFriendInit === false ? 'flex' : 'none', flex: 1, alignItems: 'center'}}>
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
                        title='Add Friends'
                        color='black'
                        onPress={() => setAddingFriendInit(true)}
                    />
                </View>
                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 180, width: '95%', height: '75%', backgroundColor: 'papayawhip', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {friendsArr}
                </View>
            </View>
            <View style={{display: addingFriendInit === true ? 'flex' : 'none', height: '50%', width: '80%'}}>
                <AddingFriendsPage userObj={user} setterAddingFriendInit={setAddingFriendInit} />
            </View>
        </View>
    )

}

export default FriendsPage