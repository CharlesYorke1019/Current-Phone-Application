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
        this.setterBetAmount(0);
    }

    displayBet() {
        this.setterChips(this.chips)
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
            if (this.currentGameBettor === 0) {
                if (this.currentGameRound === 0) {
                    this.betToCall = this.currentGameAnte;
                }
            } 

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

    dragsChips(eX, eY, chipAmount) {
        if (eX > 40 && eX < 315) {
            if (eY > 313 && eY < 455) {
                this.betAmount += chipAmount;
                this.setterBetAmount(this.betAmount);
            }
        }
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

}

export default Player