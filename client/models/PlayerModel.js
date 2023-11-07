class Player {
    displayName;
    chips;
    turn;
    betAmount;
    totalBet;
    folded;
    roomId;
    socket;
    setterChips;
    currentGameTurn;
    currentGamePot;
    currentGameAnte;
    currentGameBettor;
    currentGameRound;
    betToCall;
    setterBetAmount;
    tapCount = 0;
    setterTapCount;
    setterInitCheck;
    chipsDistr;
    isBigBlind;
    isSmallBlind;

    constructor(displayName, chips, turn, betAmount, folded, roomId, socket) {
        this.displayName = displayName;
        this.chips = chips;
        this.turn = turn;
        this.betAmount = betAmount;
        this.folded = folded;
        this.roomId = roomId;
        this.socket = socket;
    }

    initCheck() {
        if (this.currentGameTurn === this.turn) {
            this.tapCount++;

            if (this.tapCount >= 2) {
                this.checks();
            }
            
            if (this.tapCount > 0) {
                setTimeout(() => {
                    this.tapCount = 0;
                }, 3000)
            }
        }

    }

    checks() {
        if (this.currentGameTurn === this.turn) {
            this.socket.emit('pChecks', this.turn)   
        }
    }

    bets(arg) {
        if (this.currentGameTurn === this.turn) {
            this.chips -= arg
            this.socket.emit('pSubmitsBet', this.turn, arg, this.chips)
        }
    }

    displayBet() {
        this.setterChips(this.chips)
        this.betAmount = 0
        this.setterBetAmount(this.betAmount);
    }

    displayChipsAnte(ante, blind) {
        if (blind === 'bb') {
            this.setterChips(this.chips - ante)
        } else if (blind === 'sb') {
            this.setterChips(this.chips - (ante / 2))
        }
    }

    calls() {
        if (this.currentGameTurn === this.turn) {
            this.chips -= this.betToCall;
            this.socket.emit('pCallsBet', this.turn, this.betToCall, this.chips)
        }
    }

    displayCall() {
        this.setterChips(this.chips)
    }

    folds() {
        if (this.currentGameTurn === this.turn) {
            this.socket.emit('pFolds', this.turn)
        }
    }

    isABlind(arg) {
        this.chips -= arg;
    }

    dragsChips(windowWidth, windowHeight, eX, eY, chipAmount) {
        // percentage conversion
        let left = (eX / windowWidth) * 100;
        let top = (eY / windowHeight) * 100; 

        if (left > 11 && left < 90) {
            if (top > 27 && top < 55) {
                this.betAmount += chipAmount;
                this.setterBetAmount(this.betAmount);
            }
        }

        // original

        // if (eX > 40 && eX < 315) {
        //     if (eY > 313 && eY < 455) {
        //         this.betAmount += chipAmount;
        //         this.setterBetAmount(this.betAmount);
        //     }
        // }

    }

    winnerOfRound(chipsWon) {
        // this.chips += chipsWon;
        this.setterChips(this.chips + chipsWon);
    }

    setInGameInfo(gameModel) {
        this.currentGameTurn = gameModel.currentTurn;
        this.currentGamePot = gameModel.pot;
        this.currentGameAnte = gameModel.ante;
        this.currentGameBettor = gameModel.currentBettor;
        this.currentGameRound = gameModel.currentRound;
        this.betToCall = gameModel.lastBet;
    }

    clearsBet() {
        this.betAmount = 0;
        this.setterBetAmount(this.betAmount)
    }

    reBuys(amount) {
        this.chips += amount;
        this.socket.emit('playerAddsOn', this.turn, amount, this.chips);
    }

    setChips(c) {
        this.chips = c;
    }

    setPlayerViewInfo(cb1, cb2) {
        this.setterChips = cb1;
        this.setterBetAmount = cb2;
    }

    setBetting(unit) {
        if (unit === 'ANTE') {
            this.setterBetAmount(this.currentGameAnte)
        } else if (unit === '1/2') {
            this.setterBetAmount(this.currentGamePot / 2)
        } else if (unit === 'ALL-IN') {
            this.setterBetAmount(this.chips);
        }

    }

}

export default Player