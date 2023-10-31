import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Dimensions} from 'react-native';


export const PlayerGameView = ({userObj, gameStarted, playerView, setPlayerView, chips}) => {

    // Variables //

    let user = userObj;

    let [playerChips, setPlayerChips] = useState(user.playerGameObj.chips)
    let [playerBetAmount, setPlayerBetAmount] = useState(user.playerGameObj.betAmount)

    if (gameStarted) {
        user.playerGameObj.setPlayerViewInfo(setPlayerChips, setPlayerBetAmount);   
    }
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingBlindToUser', (type) => {
        if (type === 'bb') {
            setPlayerChips(user.playerGameObj.chips - user.playerGameObj.currentGameAnte);
        } else if (type === 'sb') {
            setPlayerChips(user.playerGameObj.chips - (user.playerGameObj.currentGameAnte / 2));
        }
    })
    
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

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '20%', position: 'absolute', top: '90%', alignSelf: 'center', left: '5%'}}
                    onPress={() => user.playerGameObj.setBetting('ANTE')}
                >
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>Ante</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '25%', position: 'absolute', top: '90%', alignSelf: 'center'}}
                    onPress={() => user.playerGameObj.setBetting('1/2')}
                >
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>1/2 Pot</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 2, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '25%', position: 'absolute', top: '90%', alignSelf: 'center', left: '72%'}}
                    onPress={() => user.playerGameObj.setBetting('ALL-IN')}
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

                {/* White Chip */}
                <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', position: 'absolute', top: '-32%', left: '5%', transform: [{rotateX: '40deg'}]}}>
                    <Icon name="poker-chip" size={60} color="white"></Icon>
                    <Text style={{fontSize: 26, fontFamily: 'Copperplate', textAlign: 'center', color: 'lavender', marginBottom: 10}}>{chips.smallest}</Text>
                </View>
                <Draggable x={'4.5%'} y={'-33%'} onDragRelease={(e) => user.playerGameObj.dragsChips(windowWidth, windowHeight, e.nativeEvent.pageX, e.nativeEvent.pageY, chips.smallest)} shouldReverse={true}>  
                    <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', zIndex: 1, transform: [{rotateX: '40deg'}]}}>
                        <Icon name="poker-chip" size={60} color="white"></Icon>
                    </View>
                </Draggable>

                {/* Red Chip */}
                <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', position: 'absolute', top: '-32%', left: '29.5%', transform: [{rotateX: '40deg'}]}}>
                    <Icon name="poker-chip" size={60} color="red"></Icon>
                    <Text style={{fontSize: 26, fontFamily: 'Copperplate', textAlign: 'center', color: 'lavender', marginBottom: 10}}>{chips.secondSmallest}</Text>

                </View>
                <Draggable x={'27.5%'} y={'-33%'} onDragRelease={(e) => user.playerGameObj.dragsChips(windowWidth, windowHeight, e.nativeEvent.pageX, e.nativeEvent.pageY, chips.secondSmallest)} shouldReverse={true}>  
                    <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', transform: [{rotateX: '40deg'}]}}>
                        <Icon name="poker-chip" size={60} color="red"></Icon>
                    </View>
                </Draggable>

                {/* Lightblue Chip */}
                <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', position: 'absolute', top: '-32%', left: '54.5%', transform: [{rotateX: '40deg'}]}}>
                    <Icon name="poker-chip" size={60} color="lightblue"></Icon>
                    <Text style={{fontSize: 26, fontFamily: 'Copperplate', textAlign: 'center', color: 'lavender', marginBottom: 10}}>{chips.secondLargest}</Text>
                </View>
                <Draggable x={'51%'} y={'-33%'} onDragRelease={(e) => user.playerGameObj.dragsChips(windowWidth, windowHeight, e.nativeEvent.pageX, e.nativeEvent.pageY, chips.secondLargest)} shouldReverse={true}>  
                    <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', zIndex: 1, transform: [{rotateX: '40deg'}]}}>
                        <Icon name="poker-chip" size={60} color="lightblue"></Icon>
                    </View>
                </Draggable>

                {/* Green Chip */}
                <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', position: 'absolute', top: '-32%', left: '80%', transform: [{rotateX: '40deg'}]}}>
                    <Icon name="poker-chip" size={60} color="green"></Icon>
                    <Text style={{fontSize: 26, fontFamily: 'Copperplate', textAlign: 'center', color: 'lavender', marginBottom: 10}}>{chips.largest}</Text>

                </View>
                <Draggable x={'75%'} y={'-33%'} onDragRelease={(e) => user.playerGameObj.dragsChips(windowWidth, windowHeight, e.nativeEvent.pageX, e.nativeEvent.pageY, chips.largest)} shouldReverse={true}>  
                    <View style={{alignSelf: 'center', backgroundColor: 'black', borderRadius: '50%', transform: [{rotateX: '40deg'}]}}>
                        <Icon name="poker-chip" size={60} color="green"></Icon>
                    </View>
                </Draggable>
           
            </View>

        </View>
    )
}