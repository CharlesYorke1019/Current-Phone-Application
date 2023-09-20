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
    betToCall;
    setterBetAmount;
    tapCount = 0;
    setterTapCount;
    setterInitCheck;

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

    calls() {
        if (this.currentGameTurn === this.turn) {
            this.chips -= this.betToCall
            this.socket.emit('pCallsBet', this.turn, this.betToCall, this.chips)
        }
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

}

export default Player