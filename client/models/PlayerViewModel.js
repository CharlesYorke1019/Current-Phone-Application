import { Button, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Draggable from 'react-native-draggable';


export const PlayerGameView = ({userObj, gameStarted, playerView, setPlayerView}) => {
    let user = userObj;

    let [playerChips, setPlayerChips] = useState(user.playerGameObj.chips)
    let [playerBetAmount, setPlayerBetAmount] = useState(user.playerGameObj.betAmount)

    user.playerGameObj.setterChips = setPlayerChips;
    user.playerGameObj.setterBetAmount = setPlayerBetAmount;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderColor: 'lightgrey', width: '100%', height: '100%', display: gameStarted === true && playerView === false ? 'flex' : 'none', position: 'absolute'}}>
            <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: '10%'}}>
                <Button 
                    title='Table View'
                    color='black'
                    onPress={() => setPlayerView(true)}
                />
            </View>

            <Text style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: '20%'}}>Chips: {playerChips}</Text>

            <TouchableOpacity style={{borderWidth: 4, borderRadius: 5, width: '100%', height: '30%', backgroundColor: 'papayawhip', position: 'absolute', top: '28%', justifyContent: 'center'}} onPress={() => user.playerGameObj.initCheck()}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>Bet Amount: {playerBetAmount}</Text>
                <View style={{borderWidth: 2, borderTopWidth: 0, borderRadius: 5, backgroundColor: 'lightgrey', width: '30%', position: 'absolute', top: 0, alignSelf: 'center'}}>
                    <Button 
                        title='Clear Bets'
                        color='black'
                        onPress={() => setPlayerBetAmount(0)}
                    />
                </View>
            </TouchableOpacity>

            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: '65%', left: '15%'}}>
                <Button 
                        title='Bet'
                        color='black'
                        onPress={() => user.playerGameObj.bets(playerBetAmount)}
                    />
            </View>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: '65%', left: '42%'}}>
                <Button 
                        title='Call'
                        color='black'
                        onPress={() => user.playerGameObj.calls()}
                    />
            </View>
            <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', position: 'absolute', top: '65%', left: '70%'}}>
                <Button 
                        title='Fold'
                        color='black'
                        onPress={() => user.playerGameObj.folds()}
                    />
            </View>

            <View style={{borderWidth: 4, borderRadius: 5, backgroundColor: 'papayawhip', position: 'absolute', top: '77%', width: '100%', height: '10%'}}>
                <Draggable x={10} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, 0.25)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                        <Text style={{fontSize: 15}}>.25</Text>
                    </View>
                </Draggable>
                <Draggable x={100} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, 0.50)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow'}}>
                        <Text style={{fontSize: 15}}>.50</Text>
                    </View>
                </Draggable>
                <Draggable x={190} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, 1)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgreen'}}>
                        <Text style={{fontSize: 15}}>1</Text>
                    </View>
                </Draggable>
                <Draggable x={280} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, 5)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'violet'}}>
                        <Text style={{fontSize: 15}}>5</Text>
                    </View>
                </Draggable>
            </View>

        </View>
    )
}