import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import Home from './Screens/Home';
import CreateGame from './Screens/CreateGame';
import ProfilePage from './Screens/ProfilePage';
import CreateAccount from './Screens/CreateAccount';
import LogIn from './Screens/LogIn';
import JoinGame from './Screens/JoinGame';
import PlayerInGameDisplays from './Screens/PlayerInGameDisplays';

import FriendsPage from './Screens/FriendsPage';
import AddingFriendsPage from './Screens/AddingFriendsPage';
import ProfileButton from './Components/ProfileButton';
import AlertsPage from './Screens/AlertsPage';
import GamePage from './Screens/GamePage';

import ProfileInfoPage from './Screens/ProfileInfoPage';
import GroupsPage from './Screens/GroupsPage';


const Stack = createNativeStackNavigator()

function App() {
  let content;

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name="CreateGame" component={CreateGame} />
      <Stack.Screen name="Profile" component={ProfilePage}/>
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="JoinGame" component={JoinGame} />
      <Stack.Screen name="PlayerInGameDisplays" component={PlayerInGameDisplays} />
      <Stack.Screen name="FriendsPage" component={FriendsPage} />
      {/* <Stack.Screen name="AddingFriendsPage" component={AddingFriendsPage} /> */}
      <Stack.Screen name="AlertsPage" component={AlertsPage}/>
      <Stack.Screen name="ProfileButton" component={ProfileButton}/>
      <Stack.Screen name="GamePage" component={GamePage}/>
      <Stack.Screen name="ProfileInfoPage" component={ProfileInfoPage}/>
      <Stack.Screen name="GroupsPage" component={GroupsPage}/>

    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

