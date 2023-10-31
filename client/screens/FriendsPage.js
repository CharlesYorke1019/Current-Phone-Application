import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import AddingFriendsPage from './AddingFriendsPage';
import FriendsListDisplay from '../Components/FriendsListDisplay';
import BackBttn from '../Components/BackBttnProfileSubPages';
import style from '../Styles/style';

const FriendsPage = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    let [addingFriendInit, setAddingFriendInit] = useState(false)
    let friendsArr = [];

    //////////////////////////////////////////////////////////////////

    // Friends List Elements //

    for (let i = 0; i < user.friendsList.length; i++) {
        friendsArr.push(
            <FriendsListDisplay key={i} username={user.friendsList[i]} />
        )
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Friends</Text>
            <View style={{display: addingFriendInit === false ? 'flex' : 'none', flex: 1}}>
                <BackBttn user={user} />        
                <TouchableOpacity style={style.addFriendsBttn}
                    onPress={() => setAddingFriendInit(true)}
                >
                    <Text style={style.addFriendsBttnText}>Add Friends</Text>
                </TouchableOpacity>
                <View style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 180, width: '95%', height: '75%', backgroundColor: 'papayawhip', flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center'}}>
                    {friendsArr}
                </View>
            </View>
            <View style={{display: addingFriendInit === true ? 'flex' : 'none', height: '50%', width: '80%', alignSelf: 'center'}}>
                <AddingFriendsPage userObj={user} setterAddingFriendInit={setAddingFriendInit} />
            </View>
        </View>
    )
}

export default FriendsPage