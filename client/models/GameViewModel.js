import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import GameModel from './GameModel';
import settingPlayerPositions from './PlayerPositionsModel';
import { useNavigation } from '@react-navigation/native'
import style from '../Styles/style';


var gModel;

export const GameViewModel = ({rS, user, gameObj, gameStarted, setGameStart, playerView, setPlayerView}) => {

    // Variables //

    const navigation = useNavigation();

    // let roomSize = rS;
    let [roomSize, setRoomSize] = useState(rS);

    const gameState = gameObj;

    let PlayerBorders = [];
    let PlayersDisplayName;
    let PlayersDisplayChips;
    let inGamePlayerPositions = settingPlayerPositions(roomSize);
    let BigBlindSelection = [];
    let WinnerSelection = [];
    let BuyInsArr = [];

    let [gameInfoDisplay, setGameInfoDisplay] = useState(false)
    let [inGameMenuActive, setInGameMenuActive] = useState(false);
    let [menuButton, setMenuButton] = useState(true)
    let [roundTransition, setRoundTransition] = useState(false);
    let [selectedWinner, setSelectedWinner] = useState(0);
    let [winnerChosen, setWinnerChosen] = useState(false);
    let [initLeaveGame, setInitLeaveGame] = useState(false);
    let [initInvitingPlayer, setInitInvitingPlayer] = useState(false);
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('')
    let [responseStatus, setResponseStatus] = useState(0);
    let [restrictionInvitingPlayers, setRestrictionInvitingPlayers] = useState(false);
    let [restrictionReason, setRestrictionReason] = useState('');
    let [changeRS, setChangeRS] = useState(false);
    let [restrictedChangeRS, setRestrictedChangeRS] = useState(false);
    let [changeRSOptions, setChangeRSOptions] = useState(0);
    let [activeBBSelect, setActiveBBSelect] = useState(0);
    let [toggleBBSelect, setToggleBBSelect] = useState(false)
    let [activeSBSelect, setActiveSBSelect] = useState();
    let [firstToAct, setFirstToAct] = useState();
    let [activePot, setActivePot] = useState();
    let [activeRound, setActiveRound] = useState();
    let [gameTurn, setGameTurn] = useState();
    let [addOnWindow, setAddOnWindow] = useState(false);
    let [restrictionAddOn, setRestrictionAddOn] = useState(false);

    let usernameInviting = null;
    let usernameInvitingHolder;

    let addOnAmount = null;
    let addOnHolder;

    let usernameRef = useRef();

    //////////////////////////////////////////////////////////////////

    // Functions //

    const initGameStart = () => {
        user.socket.emit('initGameStarted', activeBBSelect, activeSBSelect);
        setToggleBBSelect(false)
    }

    const WinnerSubmitted = () => {
        user.socket.emit('winnerHasBeenChosen', selectedWinner)
        setWinnerChosen(true)
    }

    const userSettingBigBlind = (turn) => {
        setActiveBBSelect(turn);
        if (turn === 1) {
            setActiveSBSelect(2)
            setFirstToAct(3)
        } else if (turn === 2) {
            setActiveSBSelect(4)
            setFirstToAct(1)
        } else if (turn === 3) {
            setActiveSBSelect(1)
            setFirstToAct(4)
        } else if (turn === 4) {
            setActiveSBSelect(3)
            setFirstToAct(2)
        }
    }

    const userInivitingPlayerToGame = () => {
        setInGameMenuActive(false)
        if (roomSize > gameState.players.length) {
            setInitInvitingPlayer(true);
        } else {
            setRestrictionReason('The Game Lobby Is Full. You Currently Cannot Invite Other Players.')
            setRestrictionInvitingPlayers(true);
        }
    }

    const userXOutInvitingPlayer = () => {
        if (readyResponse) {
            
            if (responseStatus === 200) {
                setInitInvitingPlayer(false);
                setRestrictionInvitingPlayers(false);
                setInGameMenuActive(true);
            } else if (responseStatus === 400) {
                setReadyResponse(false);
                setInitInvitingPlayer(true);
            }

            usernameRef.current.clear();

        } else {
            setInitInvitingPlayer(false);
            setRestrictionInvitingPlayers(false);
            setInGameMenuActive(true);

            if (usernameInviting != null) {
                usernameRef.current.clear();
            }
        }
    }

    const userLeavesGame = () => {
        user.leaveGame(user.playerGameObj.turn);
        navigation.navigate('Home');
    }

    const toggleRoomSizeChangeWindow = () => {
        setChangeRS(!changeRS);
        setInGameMenuActive(!inGameMenuActive);

        if (changeRSOptions != 0) {
            setChangeRSOptions(0);
        }
    }

    const roomSizeChangeSubmitted = () => {
        user.socket.emit('roomSizeChanged', changeRSOptions);
        setChangeRS(false)
        setMenuButton(true)
    }

    const toggleGameInfoWindow = () => {
        setInGameMenuActive(!inGameMenuActive);
        setGameInfoDisplay(!gameInfoDisplay);
    }

    const toggleAddOnWindow = () => {
        setInGameMenuActive(!inGameMenuActive);
        setAddOnWindow(!addOnWindow);

        if (gameStarted) {
            setRestrictionReason('Please Wait Until The Current Round Is Over To Add-On.')
            setRestrictionAddOn(true);
        }

        if (readyResponse) {
            setReadyResponse(false);
            setResponseText('');
        }
    }

    const toggleInGameMenu = () => {
        setMenuButton(!menuButton);
        setInGameMenuActive(!inGameMenuActive);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('sendingBackGameStart', (info) => {
        gModel = new GameModel(roomSize, 0, 0, 0, 0, [], info, 0, 0, Number(gameState.ante), [], setActiveRound, setRoundTransition, gameState.pNickNames, gameState.pChips, gameState.gameStyle)
        
        setGameStart(true)
        setPlayerView(false)

        gModel.gameStarted = true;

        gModel.initRound(gameState)
        setGameTurn(gModel.currentTurn);
        setActivePot(gModel.pot);
        setActiveRound(gModel.currentRoundName)

        user.playerGameObj.setInGameInfo(gModel)

        if (gModel.bigBlind === user.playerGameObj.turn) {
            gModel.setPlayerBorders(gameState, (user.playerGameObj.chips - gModel.ante), user.playerGameObj.turn);

            // CAUSING TYPERROR WITH SETTERCHIPS
            user.playerGameObj.displayChipsAnte(gModel.ante, 'bb');
        }

        if (gModel.smallBlind === user.playerGameObj.turn) {
            gModel.setPlayerBorders(gameState, (user.playerGameObj.chips - (gModel.ante / 2)), user.playerGameObj.turn)

            // CAUSING TYPERROR WITH SETTERCHIPS
            user.playerGameObj.displayChipsAnte(gModel.ante, 'sb')
        }

    })

    user.socket.on('playerSubmitsBet', (turn, betAmount, pBettingChips) => {
        user.playerGameObj.displayBet();

        gModel.pot += betAmount;
        activePot += betAmount;
        setActivePot(activePot);

        gModel.setNextTurn(turn, 'bet');
        setGameTurn(gModel.currentTurn);

        user.playerGameObj.currentGameTurn = gModel.currentTurn;
        user.playerGameObj.betToCall = betAmount;

        gModel.lastBet = betAmount;
        gModel.currentBettor = turn;

        gModel.setPlayerBorders(gameState, pBettingChips, turn);
        
    })

    user.socket.on('playerFolds', (turn) => {
        gModel.addPlayer2FoldedArr(turn);

        gModel.setNextTurn(turn, 'fold');
        setGameTurn(gModel.currentTurn);

        gModel.handleFold(turn);

        user.playerGameObj.currentGameTurn = gModel.currentTurn;
    })

    user.socket.on('playerChecks', (turn) => {
        gModel.setNextTurn(turn, 'check');
        setGameTurn(gModel.currentTurn);

        user.playerGameObj.currentGameTurn = gModel.currentTurn;

    })

    user.socket.on('playerCallsBet', (turn, callAmount, playerChips) => {
        user.playerGameObj.displayCall();

        gModel.pot += callAmount
        activePot += callAmount;
        setActivePot(activePot);

        gModel.setNextTurn(turn, 'call');
        setGameTurn(gModel.currentTurn);

        gModel.setPlayerBorders(gameState, playerChips, turn)

        // user.playerGameObj.currentGameTurn = gModel.currentTurn;

        user.playerGameObj.setInGameInfo(gModel);

    })

    user.socket.on('sendingBackWinnerOfRound', (winner) => {
        if (winner === user.playerGameObj.turn) {
            user.playerGameObj.winnerOfRound(gModel.pot);
        }
    })

    user.socket.on('sendingBackInitNextRound', () => {
        setWinnerChosen(false);
        setRoundTransition(false);
        setPlayerView(false);

        gModel.startNextRound();

        setActiveBBSelect(gModel.bigBlind)

        gModel.initRound();

        setGameTurn(gModel.currentTurn);

        setActivePot(gModel.pot)

        setActiveRound(gModel.currentRoundName);

        user.playerGameObj.currentGameTurn = gModel.currentTurn;
    })   
    
    user.socket.on('inviteToGameConfirmed', () => {
        setResponseText('Invite To Game Sent!');
        setReadyResponse(true);
        setResponseStatus(200);
    })

    user.socket.on('inviteToGameFailed', () => {
        setResponseText('Invite To Game Failed. Please Try Again');
        setReadyResponse(true);
        setResponseStatus(400);
    })

    user.socket.on('playerHasLeftGame', (turn) => {
        gameState.pNickNames[turn - 1] = undefined

        if (gameStarted) {
            gModel.addPlayer2FoldedArr(turn);

            gModel.setNextTurn(turn, 'fold');
            setGameTurn(gModel.currentTurn);

            gModel.handleFold(turn);

            user.playerGameObj.currentGameTurn = gModel.currentTurn;
        }
        
    })

    user.socket.on('sendingBackRSChange', (newRS) => {
        setRoomSize(newRS)

        if (gameStarted) {
            gModel.updateGameSize(newRS)
        }
    })

    user.socket.on('sendingBackAddOn', (turn, totalChips, totalBuyIn) => {

        if (gameStarted) {
            gModel.setPlayerBorders(gameState, totalChips, turn);
            gModel.setTotalBuyIns(gameState, totalBuyIn, turn)
        } else {
            gameState.pChips[turn - 1] = totalChips;
            gameState.totalBuyIns[turn - 1] = totalBuyIn;
        }
        
        user.playerGameObj.setChips(totalChips);
        setResponseText('Chips Have Been Added On!');
        setReadyResponse(true);
    })

    //////////////////////////////////////////////////////////////////

    // In Game Elements //

    const PokerTable = (
        <View style={{borderWidth: 4, borderRadius: '70%', borderColor: 'black', width: 175, height: 500, backgroundColor:'papayawhip', alignSelf: 'center', justifyContent: 'center'}}>

        </View>
    )

    const StartButton = (
        <TouchableOpacity style={{justifyContent: 'center', position: 'absolute', borderWidth: 2, borderRadius: 5, borderColor: 'black', backgroundColor: 'lavender', display: gameStarted === false && user.playerGameObj.turn === 1 ? 'flex' : 'none'}}
            onPress={() => setToggleBBSelect(true)}
        >
            <Text style={{fontFamily: 'Copperplate', marginLeft: 5, marginRight: 5, fontSize: 22}}>Start</Text>
        </TouchableOpacity>
    )

    const InGameMenuButton = (
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', display: inGameMenuActive === false && playerView === true && menuButton === true ? 'flex' : 'none', position: 'absolute', left: '-28%', top: '10%', height: '7%', alignItems: 'center', justifyContent: 'center', width: '10%'}}
            onPress={() => toggleInGameMenu()}
        >
             <Text style={{fontFamily: 'Copperplate', fontSize: 32}}>{'>'}</Text>
        </TouchableOpacity>
    )

    const InGameMenu = (
        <View style={{borderWidth: 4, borderRadius: 5, backgroundColor: 'papayawhip', width: '102%', height: '50%', left: '-27%', top: '10%', display: inGameMenuActive === true && initLeaveGame === false ? 'flex' : 'none', position: 'absolute'}}>
        
            <TouchableOpacity style={{borderBottomWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top:-2, left: 0, width: '100%'}}
                onPress={() => toggleInGameMenu()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 32, textAlign: 'center'}}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', alignSelf: 'center', top: 60, marginRight: 10, marginLeft: 10, fontWeight: 'bold'}}>Game Code: {gameState.idHolder}</Text>

            <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '30%', alignSelf: 'center'}}
                onPress={() => toggleGameInfoWindow()}
            >
                <Text style={{textAlign: 'center', fontSize: 20, marginRight: 10, marginLeft: 10, fontFamily: 'Copperplate'}}>Game Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top: '45%', alignSelf: 'center', display: gameState.gameStyle != 'tourney' ? 'flex' : 'none'}}
                onPress={() => toggleAddOnWindow()}
            >
                <Text style={{textAlign: 'center', fontSize: 20, marginRight: 10, marginLeft: 10, fontFamily: 'Copperplate'}}>Add-On</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top: '60%', alignSelf: 'center'}}
                onPress={() => userInivitingPlayerToGame()}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 20, fontFamily: 'Copperplate'}}>Invite Players</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top: '75%', alignSelf: 'center', display: gameState.hostId === user.socket.id && gameState.gameStyle != 'tourney' ? 'flex' : 'none'}}
                onPress={() => toggleRoomSizeChangeWindow()}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 20, fontFamily: 'Copperplate'}}>Change Game Size</Text>
            </TouchableOpacity>


            {/* WILL GO AT BOTTOM OF MENU SO LEAVING SPACE FOR OTHER ELEMENTS */}
            <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: '90%'}}
                onPress={() => setInitLeaveGame(true)}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 20, fontFamily: 'Copperplate'}}>Leave Game</Text>
            </TouchableOpacity>
        </View>
    )

    const LeaveGameConfirmation = (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', width: '90%', height: '35%', alignSelf: 'center', display: initLeaveGame === true ? 'flex' : 'none', position: 'absolute', top: '20%'}}>
            <Text style={{textAlign: 'center', marginTop: 35, marginBottom: 50, fontSize: 30, fontFamily: 'Copperplate'}}>Are You Sure You Want To Leave The Game?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', marginRight: 20}}
                    onPress={() => userLeavesGame()}
                >
                    <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 25, fontFamily: 'Copperplate', lineHeight: 30}}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender'}}
                    onPress={() => setInitLeaveGame(false)}
                >
                    <Text style={{textAlign: 'center', marginRight: 7, marginLeft: 7, fontSize: 25, fontFamily: 'Copperplate', lineHeight: 30}}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
    const GameInfo = (
        <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', width: '25%', alignSelf: 'center', position: 'absolute', top: '55%', display: gameStarted === true && winnerChosen === false ? 'flex' : 'none'}}>
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', marginBottom: 5}}>{activePot}</Text>
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate'}}>{activeRound}</Text>
        </View>
    )

    for (let i = 0; i < roomSize; i++) {
        if (gameState.pNickNames[i] != undefined ) {
            PlayersDisplayName = () => 
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16}}>{gameState.pNickNames[i]}</Text>;
            PlayersDisplayChips = () => 
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>{gameState.pChips[i]}</Text>

            BuyInsArr.push(
                <Text key={i} style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>{gameState.pNickNames[i]}: {gameState.totalBuyIns[i]}</Text>
            );

        } else {
            PlayersDisplayName = () => 
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate'}}>+</Text>;
            PlayersDisplayChips = () => 
            <Text style={{textAlign: 'center'}}></Text>
        }
        PlayerBorders.push(
            <View key={i + 1} style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', borderColor: toggleBBSelect === true && activeBBSelect === i + 1 ? 'blue' : gameTurn === i + 1 ? 'red' : 'black' , minWidth: '27%', top: inGamePlayerPositions[i].pTop, left: inGamePlayerPositions[i].pLeft}}>
                <PlayersDisplayName />
                <PlayersDisplayChips />
            </View>
        )
        BigBlindSelection.push(
            <TouchableOpacity key={i + 1} style={{borderWidth: 2, borderRadius: 5, backgroundColor: activeBBSelect === i + 1 ? 'lightcoral' : 'lavender', marginRight: 5}}
                onPress={() => userSettingBigBlind(i + 1)}
            >
                <Text style={{fontFamily: 'Copperplate', marginRight: 5, marginLeft: 5, fontSize: 24}}>{`p${i + 1}`}</Text>
            </TouchableOpacity>
        )
        WinnerSelection.push(
            <View key={i + 1} style={{borderWidth: 2, borderRadius: 5, backgroundColor: selectedWinner === i + 1 ? 'lightcoral' : 'lavender'}}>
                <Button 
                    title={`p${i + 1}`}
                    color='black'
                    onPress={() => setSelectedWinner(i + 1)}
                />
            </View>
        )

    }

    let blindLegend = (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', width: '30%', height: '10%', position: 'absolute', top: 240, alignSelf: 'center', display: toggleBBSelect === true ? 'flex' : 'none'}}>
            <Text style={{textAlign: 'center', fontSize: 10}}>If Applicable</Text>
            <View style={{width: '15%', height: '15%', backgroundColor: 'blue', position: 'absolute', left: 15, marginTop: 20, borderWidth: 1, borderRadius: 2}}>

            </View>
            <View style={{width: '15%', height: '15%', backgroundColor: 'lightcoral', position: 'absolute', left: 15, marginTop: 40, borderWidth: 1, borderRadius: 2}}>

            </View>
            <View style={{width: '15%', height: '15%', backgroundColor: 'purple', position: 'absolute', left: 15, marginTop: 60, borderWidth: 1, borderRadius: 2}}>

            </View>
            <Text style={{fontSize: 10, position: 'absolute', marginTop: 20, left: 35}}>= Big Blind</Text>
            <Text style={{fontSize: 10, position: 'absolute', marginTop: 40, left: 35}}>= Small Blind</Text>
            <Text style={{fontSize: 10, position: 'absolute', marginTop: 60, left: 35}}>= 1st To Act</Text>
        </View>
    )

    let beginButton = (
        <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', width: '35%', marginTop: 10, alignSelf: 'center', marginTop: '13%'}}
            onPress={() => initGameStart()}
        >
            <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 22}}>Begin</Text>
        </TouchableOpacity>
    )

    let submitWinnerButton = (
        <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '55%', marginTop: 10, alignSelf: 'center'}}>
            <Button 
                title='Submit'
                color='black'
                onPress={() => WinnerSubmitted()}
            />
        </View>
    )

    let nextRoundButton = (
        <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', width: '35%', top: '55%', alignSelf: 'center', display: roundTransition === true && winnerChosen === true ? 'flex' : 'none', position: 'absolute'}}>
            <Button 
                title='Next Round'
                color='black'
                onPress={() => user.socket.emit('initNextRound')}
            />
        </View>
    )

    let playerGameView = (
        <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', display: gameStarted === true && playerView === true ? 'flex' : 'none', position: 'absolute', top: 300, width: '20%'}}
            onPress={() => setPlayerView(false)}
        >
            <Text style={{fontFamily: 'Copperplate', textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 22}}>Game View</Text>
        </TouchableOpacity>
    )

    let BigBlindSelectionWindow = (
        <View style={{borderWidth: 4, borderRadius: 5, backgroundColor: 'papayawhip', minWidth: '60%', height: '20%', position: 'absolute', display: toggleBBSelect === true ? 'flex' : 'none'}}>
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: 15, marginBottom: 20, fontFamily: 'Copperplate'}}>Choose The Big Blind</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 5}}>
                {BigBlindSelection}
            </View>
            {beginButton}
        </View>
    )

    let WinnerSelectionWindow = (
        <View style={{borderWidth: 4, borderRadius: 5, backgroundColor: 'papayawhip', width: '60%', height: '20%', position: 'absolute', display: roundTransition === true && winnerChosen === false && user.playerGameObj.turn === 1 ? 'flex' : 'none'}}>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 15, marginBottom: 10}}>Choose The Winner</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {WinnerSelection}
            </View>
            {submitWinnerButton}
        </View>
    )

    let InvitingUserToGameWindow = (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', alignSelf: 'center', width: '90%', height: '35%', display: initInvitingPlayer === true  ? 'flex' : 'none', position: 'absolute', top: '20%'}}>
            <TouchableOpacity style={style.xBttn}
                onPress={() => userXOutInvitingPlayer()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>

            <View style={{display: readyResponse === false  ? 'flex' : 'none', marginTop: '35%'}}>
                <Text style={{textAlign: 'center', fontSize: 22, position: 'absolute', alignSelf: 'center', top: -85, fontFamily: 'Copperplate'}}>Enter Username To Invite</Text>
                <TextInput 
                    value={usernameInvitingHolder}
                    onChangeText={(username) => usernameInviting = username}
                    style={styles.inputStyle}
                    placeholder='enter here'
                    ref={usernameRef}
                />

                <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', width: '40%', top: 80, alignSelf: 'center'}}
                    onPress={() => user.socket.emit('invitingPlayerToGame', usernameInviting)}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 20}}>Invite</Text>
                </TouchableOpacity>


            </View>
            <View style={{display: readyResponse === true ? 'flex' : 'none', marginTop: '35%'}}>
                <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'Copperplate'}}>{responseText}</Text>  
            </View>



        </View>
    )

    let RestrictedInvitingPlayersWindow = (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', alignSelf: 'center', justifyContent: 'center', width: '85%', height: '35%', display: restrictionInvitingPlayers === true ? 'flex' : 'none', position: 'absolute'}}>
            <TouchableOpacity style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top:-2, left: 0, width: '100%'}}
                onPress={() => userXOutInvitingPlayer()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>
            
            <Text style={{textAlign: 'center'}}>{restrictionReason}</Text>
        </View>
    )

    let ChangeGameSizeWindow = (
        <View style={{display: changeRS === true ? 'flex' : 'none', width: '90%', height: '35%', alignSelf: 'center', justifyContent: 'center', position: 'absolute', borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', top: '20%'}}>
            <TouchableOpacity style={{borderBottomWidth: 2, borderRadius: 3, backgroundColor: 'lavender', width: '100%', position: 'absolute', top: 0}}
                onPress={() => toggleRoomSizeChangeWindow()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>

            <View style={{display: roundTransition === true || gameStarted === false ? 'flex' : 'none'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50, marginBottom: 10}}>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 2 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(2)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 3 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(3)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 4 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(4)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 5 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(5)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>5</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 50}}>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 6 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(6)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 7 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(7)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 8 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(8)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: changeRSOptions === 9 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setChangeRSOptions(9)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>9</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: 'black', backgroundColor: 'lavender'}}
                    onPress={() => roomSizeChangeSubmitted()} 
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 22, marginRight: 5, marginLeft: 5}}>Submit</Text>
                </TouchableOpacity>


            </View>

            <View style={{display: roundTransition === false && gameStarted === true ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 22}}>You Cannot Change The Room Size Currently. Please Wait Until The Next Round Is Over.</Text>
            </View>
        </View>
    )

    let GameInfoWindow = (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', alignSelf: 'center', display: gameInfoDisplay === true ? 'flex' : 'none', width: '90%', height: '35%', position: 'absolute', top: '20%'}}>
            <TouchableOpacity style={style.xBttn}
                onPress={() => toggleGameInfoWindow()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>

            <View style={{marginTop: 10}}>
                <Text style={{textAlign: 'center', fontSize: 29, marginBottom: 20, fontFamily: 'Copperplate'}}>Buy-Ins: </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', width: '45%'}}>
                    {BuyInsArr}
                </View> 
            </View>
            

        </View>
    )

    let AddOnWindow = (
        <View style={{width: '90%', height: '35%', alignSelf: 'center', position: 'absolute', borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', display: addOnWindow === true ? 'flex' : 'none', flex: 1, top: '20%'}}>
            <TouchableOpacity style={style.xBttn}
                onPress={() => toggleAddOnWindow()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>

            <View style={{display: restrictionAddOn === false ? 'flex' : 'none', alignItems: 'center', position: 'absolute', top: '20%', width: '100%'}}>
                <View style={{display: readyResponse === false ? 'flex' : 'none'}}>
                    <View style={{marginBottom: '19%', alignItems: 'center', marginTop: '2%'}}>
                        <Text style={{textAlign: 'center', fontSize: 26, fontFamily: 'Copperplate'}}>Enter Add-On</Text>
                    </View>
                    
                    <View style={{width: '100%', alignSelf: 'center', marginBottom: '18%'}}>
                        <TextInput 
                            value={addOnHolder}
                            onChangeText={(v) => addOnAmount = v}
                            keyboardType='numeric'
                            style={styles.inputStyle}
                            placeholder='enter here'
                        />
                    </View>
                    
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 3, backgroundColor: 'lavender', width: '40%', alignSelf: 'center'}}
                        onPress={() => user.playerGameObj.reBuys(Number(addOnAmount))}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 22, marginRight: 5, marginLeft: 5}}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <View style={{display: readyResponse === true ? 'flex' : 'none', width: '80%'}}>
                    <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'}}>{responseText}</Text>
                </View>
            </View>

            <View style={{display: restrictionAddOn === true ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate', marginTop: '20%'}}>{restrictionReason}</Text>
            </View>
        </View>
    )
    

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {PokerTable}
            {PlayerBorders}
            {StartButton}
            {BigBlindSelectionWindow}
            {playerGameView}
            {GameInfo}
            {blindLegend}
            {InGameMenuButton}
            {InGameMenu}
            {nextRoundButton}
            {WinnerSelectionWindow}
            {LeaveGameConfirmation}
            {InvitingUserToGameWindow}
            {RestrictedInvitingPlayersWindow}
            {ChangeGameSizeWindow}
            {GameInfoWindow}
            {AddOnWindow}
        </View>
    )

}

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#DBDBD6'
    },

    bigBlind: {
        borderColor: 'blue'
    },

    smallBlind: {
        borderColor: 'lightcoral'
    },

    firstToAct: {
        borderColor: 'purple'
    },

    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender',
        alignSelf: 'center',
        textAlign: 'center',
        borderWidth: 2,
        position: 'absolute',
        top: -35,
        borderRadius: 5
    },
})

