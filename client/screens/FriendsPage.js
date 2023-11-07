import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import AddingFriendsPage from './AddingFriendsPage';
import FriendsListDisplay from '../Components/FriendsListDisplay';
import BackBttn from '../Components/BackBttnProfileSubPages';
import SpecificFriendView from './SpecificFriendView';
import style from '../Styles/style';

const FriendsPage = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    let [addingFriendInit, setAddingFriendInit] = useState(false)
    let friendsArr = [];

    let [specificFriendView, setSpecificFriendView] = useState(false);
    let [specificUsername, setSpecificUsername] = useState('');

    //////////////////////////////////////////////////////////////////

    // Functions //

    const displaySpecificFriendView = () => {
        setSpecificFriendView(true);
    }

    //////////////////////////////////////////////////////////////////

    // Friends List Elements //

    for (let i = 0; i < user.friendsList.length; i++) {
        friendsArr.push(
            <FriendsListDisplay key={i} username={user.friendsList[i]} cb1={displaySpecificFriendView} cb2={setSpecificUsername} />
        )
    }

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            <Text style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', fontSize: 30, width: '70%', height: '5.2%', textAlign: 'center', position: 'absolute', top: 55, alignSelf: 'center', fontFamily: 'Copperplate', lineHeight: 38}}>Friends</Text>
            <View style={{display: addingFriendInit === false && specificFriendView === false ? 'flex' : 'none', flex: 1}}>
                <BackBttn user={user} />        
                <TouchableOpacity style={style.addFriendsBttn}
                    onPress={() => setAddingFriendInit(true)}
                >
                    <Text style={style.addFriendsBttnText}>Add Friends</Text>
                </TouchableOpacity>


                <ScrollView style={{borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 180, width: '95%', height: '75%', backgroundColor: 'papayawhip', alignSelf: 'center'}} contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}} >
                    {friendsArr}
                
                    <View style={{marginBottom: 3000}}>

                    </View>
                </ScrollView>

                
            </View>
            <View style={{display: addingFriendInit === true ? 'flex' : 'none', height: '50%', width: '80%', alignSelf: 'center'}}>
                <AddingFriendsPage userObj={user} setterAddingFriendInit={setAddingFriendInit} />
            </View>

            <View style={{display: specificFriendView === true ? 'flex' : 'none', width: '80%', alignSelf: 'center'}}>
                <SpecificFriendView user={user} username={specificUsername} currentView={specificFriendView} setCurrentView={setSpecificFriendView} />
            </View>

        </View>
    )
}

export default FriendsPage