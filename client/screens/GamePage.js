import { SafeAreaView, Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Draggable from 'react-native-draggable';
import {player1, player2, player3, player4, roundEnder, setPf, winnerSubmitted, displayWinnerOfRound, displayNextRound2Room, nextRoundIsInitiated} from './PlayerLogic';
import Player from '../Models/PlayerModel';
import { PlayerGameView } from '../Models/PlayerViewModel';
import { GameViewModel } from '../Models/GameViewModel';
import GameModel from '../Models/GameModel';


const GamePage = ({route}) => {


    const navigation = useNavigation();
    let user = route.params.paramKey
    let sentGameObj = route.params.gameKey

    const [sentGameSize, setSentGameSize] = useState(sentGameObj.desiredRoomSize);
    
    const [gameStarted, setGameStarted] = useState(false);

    let [tableView, setTableView] = useState(true);

    let PGameView;

    let GModle;

    for (let i = 0; i < sentGameObj.pNickNames.length; i++) {
        if (user.socket.id === sentGameObj.players[i]) {
            user.playerGameObj.turn = i + 1;
        }
    }

    GModle = (
        <GameViewModel rS={sentGameSize} user={user} gameObj={sentGameObj} gameStarted={gameStarted} setGameStart={setGameStarted} playerView={tableView} setPlayerView={setTableView} />
    )

    if (gameStarted) {
        PGameView = (
            <PlayerGameView userObj={user} gameStarted={gameStarted} playerView={tableView} setPlayerView={setTableView} />
        )
    }
    
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            {GModle}
            {PGameView}
        </View>
    )

}

export default GamePage

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6',
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        top: 150
    },

    bigBlindStyle: {
        color: 'green'
    },

    smallBlindStyle: {
        color: 'red'
    },

    noBlindStyle: {
        color: 'red'
    },
})