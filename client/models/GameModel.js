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

    constructor(gameSize, currentTurn, currentRound, currentBettor, lastBet, gameArray, bigBlind, smallBlind, pot, ante, pFoldedArr, roundSetter, roundTransitionSetter, pDisplayNames, pDisplayChips) {
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

    handleFold(turn) {
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

}

export default GameModel
