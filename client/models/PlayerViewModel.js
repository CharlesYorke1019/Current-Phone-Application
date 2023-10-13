import { Button, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Draggable from 'react-native-draggable';


export const PlayerGameView = ({userObj, gameStarted, playerView, setPlayerView, chips}) => {

    // Variables //

    let user = userObj;

    let [playerChips, setPlayerChips] = useState(user.playerGameObj.chips)
    let [playerBetAmount, setPlayerBetAmount] = useState(user.playerGameObj.betAmount)
    
    user.playerGameObj.setterChips = setPlayerChips;
    user.playerGameObj.setterBetAmount = setPlayerBetAmount;    
    

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'mistyrose', borderColor: 'red', width: '100%', height: '100%', display: gameStarted === true && playerView === false ? 'flex' : 'none', position: 'absolute'}}>
            <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '9%', width: '25%'}}
                onPress={() => setPlayerView(true)}
            >
                <Text style={{fontFamily: 'Copperplate', marginLeft: 5, marginRight: 5, fontSize: 22, textAlign: 'center'}}>Table View</Text>
            </TouchableOpacity>


            <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '20%'}}>
                <Text style={{marginRight: 5, marginLeft: 5, fontFamily: 'Copperplate', fontSize: 16}}>Chips: {playerChips}</Text>
            </View>

            <TouchableOpacity style={{borderWidth: 4, borderRadius: 5, width: '100%', height: '30%', backgroundColor: 'papayawhip', position: 'absolute', top: '28%', justifyContent: 'center'}} onPress={() => user.playerGameObj.initCheck()}>
                <Text style={{fontSize: 19, textAlign: 'center', fontFamily: 'Copperplate'}}>Bet Amount: {playerBetAmount}</Text>
    
                <TouchableOpacity style={{borderWidth: 2, borderTopWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '30%', position: 'absolute', top: 0, alignSelf: 'center'}}
                    onPress={() => user.playerGameObj.clearsBet()}
                >
                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>Clear Bets</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '20%', position: 'absolute', top: 216, alignSelf: 'center', left: 20}}
                    onPress={() => setPlayerBetAmount(user.playerGameObj.currentGameAnte)}
                >
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>Ante</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '25%', position: 'absolute', top: 216, alignSelf: 'center'}}
                    onPress={() => setPlayerBetAmount(user.playerGameObj.currentGamePot / 2)}
                >
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>1/2 Pot</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '20%', position: 'absolute', top: 216, alignSelf: 'center', left: 270}}
                    onPress={() => setPlayerBetAmount(playerChips)}
                >
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>All-In</Text>
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '65%', left: '5%', width: '25%', height: '6%', justifyContent: 'center'}}
                onPress={() => user.playerGameObj.bets(playerBetAmount)}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center'}}>Bet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '65%', width: '25%', height: '6%', justifyContent: 'center', alignSelf: 'center'}}
                onPress={() => user.playerGameObj.calls()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center'}}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '65%', left: '70%', width: '25%', height: '6%', justifyContent: 'center'}}
                onPress={() => user.playerGameObj.folds()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center'}}>Fold</Text>
            </TouchableOpacity>

            <View style={{borderWidth: 4, borderRadius: 5, backgroundColor: 'papayawhip', position: 'absolute', top: '77%', width: '100%', height: '10%'}}>
                <Draggable x={10} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, chips.smallest)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderStyle: 'dashed'}}>
                        <Text style={{fontSize: 16, fontFamily: 'Copperplate'}}>{chips.smallest}</Text>
                    </View>
                </Draggable>
                <Draggable x={100} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, chips.secondSmallest)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderStyle: 'dashed'}}>
                        <Text style={{fontSize: 16, fontFamily: 'Copperplate'}}>{chips.secondSmallest}</Text>
                    </View>
                </Draggable>
                <Draggable x={190} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, chips.secondLargest)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue', borderStyle: 'dashed'}}>
                        <Text style={{fontSize: 16, fontFamily: 'Copperplate'}}>{chips.secondLargest}</Text>
                    </View>
                </Draggable>
                <Draggable x={280} y={-38} onDragRelease={(e) => user.playerGameObj.dragsChips(e.nativeEvent.pageX, e.nativeEvent.pageY, chips.largest)} shouldReverse={true}>  
                    <View style={{borderWidth: 2, borderRadius: '50%', width: 50, height: 50, position: 'absolute', top: 50, left: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', borderStyle: 'dashed'}}>
                        <Text style={{fontSize: 16, fontFamily: 'Copperplate'}}>{chips.largest}</Text>
                    </View>
                </Draggable>
            </View>

        </View>
    )
}