class GameModel {
    gameSize;
    currentTurn;
    currentRound;
    currentBettor;
    lastBet;
    gameArray;
    bigBlind;
    smallBlind;
    pot;
    ante;
    currentRoundName;
    pFoldedArr;
    roundSetter;
    roundTransitionSetter;
    pDisplayNames;
    pDisplayChips;
    roundTransition = false;
    sidePotActive = false;
    sidePot = 0;
    totalSidePots = 0;
    gameStyle;
    gameTime = 0;
    active = true;
    gameStarted;
    anyPlayersAllIn = false;

    constructor(gameSize, currentTurn, currentRound, currentBettor, lastBet, gameArray, bigBlind, smallBlind, pot, ante, pFoldedArr, roundSetter, roundTransitionSetter, pDisplayNames, pDisplayChips, gameStyle) {
        this.gameSize = gameSize
        this.currentTurn = currentTurn;
        this.currentRound = currentRound;
        this.currentBettor = currentBettor;
        this.lastBet = lastBet;
        this.gameArray = gameArray;
        this.bigBlind = bigBlind;
        this.smallBlind = smallBlind;
        this.pot = pot;
        this.ante = ante
        this.currentRoundName = 'Pre-Flop';
        this.pFoldedArr = pFoldedArr
        this.roundSetter = roundSetter;
        this.roundTransitionSetter = roundTransitionSetter;
        this.pDisplayNames = pDisplayNames;
        this.pDisplayChips = pDisplayChips;
        this.gameStyle = gameStyle;
    }

    initRound(state) {
        if (this.gameSize === 2) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [1, 2];
            }
        } else if (this.gameSize === 3) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [1, 2, 3];
            }
        } else if (this.gameSize === 4) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [1, 2, 3, 4];
            }
        } else if (this.gameSize === 5) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [1, 2, 3, 4, 5];
            }
        } else if (this.gameSize === 6) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [1, 2, 3, 4, 5, 6];
            }
        } else if (this.gameSize === 7) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7];
            }
        } else if (this.gameSize === 8) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 8, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 8, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 8, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 8, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 8, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 8, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [8, 1, 2, 3, 4, 5, 6, 7];
            } else if (this.bigBlind === 8) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7, 8];
            }
        } else if (this.gameSize === 9) {
            if (this.bigBlind === 1) {
                this.gameArray = [2, 3, 4, 5, 6, 7, 8, 9, 1];
            } else if (this.bigBlind === 2) {
                this.gameArray = [3, 4, 5, 6, 7, 8, 9, 1, 2];
            } else if (this.bigBlind === 3) {
                this.gameArray = [4, 5, 6, 7, 8, 9, 1, 2, 3];
            } else if (this.bigBlind === 4) {
                this.gameArray = [5, 6, 7, 8, 9, 1, 2, 3, 4];
            } else if (this.bigBlind === 5) {
                this.gameArray = [6, 7, 8, 9, 1, 2, 3, 4, 5];
            } else if (this.bigBlind === 6) {
                this.gameArray = [7, 8, 9, 1, 2, 3, 4, 5, 6];
            } else if (this.bigBlind === 7) {
                this.gameArray = [8, 9, 1, 2, 3, 4, 5, 6, 7];
            } else if (this.bigBlind === 8) {
                this.gameArray = [9, 1, 2, 3, 4, 5, 6, 7, 8];
            } else if (this.bigBlind === 9) {
                this.gameArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        }

        if (this.gameStyle === 'tourney') {
            while (this.gameStarted) {
                this.gameTime++;
            }

            if (this.gameTime >= 18000000) {
                this.ante * 2;
                this.gameTime = 0;
            }
        }

        this.currentTurn = this.gameArray[0];
        this.smallBlind = this.gameArray[this.gameArray.length - 2];
        this.pot += Number(this.ante) + (Number(this.ante) / 2)
    }

    setPlayerBorders(state, info, pTurn) {
        state.pChips[pTurn - 1] = info;
    }

    setTotalBuyIns(state, info, pTurn) {
        state.totalBuyIns[pTurn - 1] = info;
    }

    setNextTurn(lastTurn, action) {
        for (let i = 0; i < this.gameArray.length; i++) {
            let j = 0;
            if (this.gameArray[i] === lastTurn) {

                if (!this.roundTransition) {

                    if (action === 'call' || action === 'fold') {

                        if (this.gameArray[i + 1]) {

                            if (this.gameArray[i + 1] != this.currentBettor) {
                                this.currentTurn = this.gameArray[i + 1];
                            } else {
                                if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                    this.currentTurn = this.smallBlind;
                                } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                    this.currentTurn = this.bigBlind;
                                } else {
                                    if (!this.pFoldedArr.includes(this.gameArray[0])) {
                                        this.currentTurn = this.gameArray[0];
                                    } 
                                }

                                this.changeRound(this.currentRound)
                            }

                        } else {

                            if (this.gameArray[0] != this.currentBettor) {
                                this.currentTurn = this.gameArray[0];
                            } else {
                                if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                    this.currentTurn = this.smallBlind;
                                } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                    this.currentTurn = this.bigBlind;
                                } else {
                                    if (!this.pFoldedArr.includes(this.gameArray[0])) {
                                        this.currentTurn = this.gameArray[0];
                                    } 
                                }

                                this.changeRound(this.currentRound)
                            }


                        }

                    }

                    if (action === 'bet') {
                        if (this.gameArray[i + 1]) {
                            this.currentTurn = this.gameArray[i + 1];
                        } else {
                            this.currentTurn = this.gameArray[0]
                        }
                    }

                    if (action === 'check') {

                        if (this.currentRound === 0) {

                            if (lastTurn === this.bigBlind) {
                                if (this.gameArray.includes(this.smallBlind) && !this.pFoldedArr.includes(this.smallBlind)) {
                                    this.currentTurn = this.smallBlind;
                                } else if (this.gameArray.includes(this.bigBlind) && !this.pFoldedArr.includes(this.bigBlind)) {
                                    this.currentTurn = this.bigBlind;
                                }

                                this.changeRound(this.currentRound)
                            }

                        } else {

                            if (!this.gameArray[i + 1]) {

                                if (lastTurn === this.smallBlind || lastTurn === this.bigBlind) {
                                    this.currentTurn = this.gameArray[0];

                                    if (this.gameSize === 2) {
                                        this.changeRound(this.currentRound);
                                    }

                                } else {
                                    this.currentTurn = this.gameArray[0];
                                    this.changeRound(this.currentRound);
                                }

                            } else {

                                if (this.gameArray[i + 1] != this.smallBlind || this.gameArray[i + 1] != this.bigBlind) {
                                    this.currentTurn = this.gameArray[i + 1];
                                } else {
                                    this.currentTurn = this.gameArray[i + 1];
                                    this.changeRound(this.currentRound);
                                }


                            }

                        }

                    }
                }
            } 
        }
    }

    addPlayer2FoldedArr(turn) {
        this.pFoldedArr.push(turn);
    }

    removePlayerOnFold(turn) {
        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] === turn) {
                this.gameArray.splice(i, 1);
            }
        }
    }

    changeRound(r) {

        if (r === 0) {
            this.roundTransition = true;
            this.currentRoundName = 'Flop';
            this.roundSetter(this.currentRoundName);
        } else if (r === 1) {
            this.roundTransition = true;
            this.currentRoundName = 'Turn';
            this.roundSetter(this.currentRoundName);
        } else if (r === 2) {
            this.roundTransition = true;
            this.currentRoundName = 'River';
            this.roundSetter(this.currentRoundName);
        } else if (r === 3) {
            this.roundTransitionSetter(true);
        }

        this.currentBettor = 0;
        this.lastBet = 0;
        this.currentRound = r + 1;

        setTimeout(() => {
            this.roundTransition = false;
        }, 10)
        

    }

    startNextRound() {
        this.pot = 0;
        this.currentRound = 0;
        this.currentRoundName = 'Pre-Flop'
        this.lastBet = 0;
        if (this.gameSize === 4) {
            if (this.bigBlind === 1) {
                this.bigBlind = 2;
            }
        }
        this.initRound()
    }

    updateGameSize(arg) {
        this.gameSize = arg;
    }

    setProgressiveBlinds() {

    }

    setPot(betAmount, activePot, cb) {
        if (!this.sidePotActive) {
            this.pot += betAmount;
            activePot += betAmount
            cb(activePot);
        } else {
            this.sidePot += betAmount;
            activePot += betAmount;
            cb(activePot);
        }
    }

    setSidePotActive() {
        this.sidePotActive = true;
    }

    handleBet(bet, pot, setPotF, lastTurn, setNextTurnF) {
        this.setPot(bet, pot, setPotF);
        this.setNextTurn(lastTurn, 'bet');
        setNextTurnF(this.currentTurn);
        this.lastBet = bet;
        this.currentBettor = lastTurn;

    }

    handleFold(lastTurn, setNextTurnF) {
        this.addPlayer2FoldedArr(lastTurn);

        this.setNextTurn(lastTurn, 'fold');
        setNextTurnF(this.currentTurn);

        this.removePlayerOnFold(lastTurn);
    }

    handleCheck(lastTurn, setNextTurnF) {
        this.setNextTurn(lastTurn, 'check');
        setNextTurnF(this.currentTurn);
    }

    handleCall(call, pot, setPotF, lastTurn, setNextTurnF) {
        this.setPot(call, pot, setPotF);
        this.setNextTurn(lastTurn, 'call');
        setNextTurnF(this.currentTurn);
    }

    initNextRound(winnerCB, roundTransitionCB, playerViewCB, activeBbCB, setNextTurnCB, setPotCB, setRoundCB) {
        winnerCB(false);
        roundTransitionCB(false);
        playerViewCB(false);
        this.startNextRound();
        activeBbCB(this.bigBlind)
        this.initRound();
        setNextTurnCB(this.currentTurn);
        setPotCB(this.pot)
        setRoundCB(this.currentRoundName);
    }

    handlePlayerLeaving(gameState, gameStarted, playerLeavingTurn, setNextTurnCB) {
        gameState.pNickNames[turn - 1] = undefined
        if (gameStarted) {
            this.addPlayer2FoldedArr(playerLeavingTurn);
            this.setNextTurn(playerLeavingTurn, 'fold');
            setNextTurnCB(this.currentTurn);
            this.handleFold(turn);
        }
    }

    handleAddOn(gameState, stateArr1, stateArr2, setResponseTextCB, setReadyResponseCB) {
        gameState.pChips = stateArr1;
        gameState.totalBuyIns = stateArr2;
        setResponseTextCB('Chips Have Been Added On!');
        setReadyResponseCB(true);
    }

}

export default GameModel
