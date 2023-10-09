import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { PlayerGameView } from '../Models/PlayerViewModel';
import { GameViewModel } from '../Models/GameViewModel';
import ChipIncrements from '../Models/ChipIncrements';

const GamePage = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey
    let sentGameObj = route.params.gameKey

    const [sentGameSize, setSentGameSize] = useState(sentGameObj.desiredRoomSize);
    
    const [gameStarted, setGameStarted] = useState(false);

    let [tableView, setTableView] = useState(true);

    let PGameView;

    let GModle;

    let chips = new ChipIncrements(Number(sentGameObj.ante), 0, 0, 0);

    //////////////////////////////////////////////////////////////////

    // Functions //

    user.changeCurrentPage('GamePage')

    for (let i = 0; i < sentGameObj.pNickNames.length; i++) {
        if (user.socket.id === sentGameObj.players[i]) {
            user.playerGameObj.turn = i + 1;
        }
    }

    //////////////////////////////////////////////////////////////////

    // Game Elements //

    GModle = (
        <GameViewModel rS={sentGameSize} user={user} gameObj={sentGameObj} gameStarted={gameStarted} setGameStart={setGameStarted} playerView={tableView} setPlayerView={setTableView} />
    )

    if (gameStarted) {
        chips.initChips();
        PGameView = (
            <PlayerGameView userObj={user} gameStarted={gameStarted} playerView={tableView} setPlayerView={setTableView} chips={chips} />
        )
    }

    //////////////////////////////////////////////////////////////////
    
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
        >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey'}}>
            {GModle}
            {PGameView}
        </View>
        </TouchableWithoutFeedback>
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