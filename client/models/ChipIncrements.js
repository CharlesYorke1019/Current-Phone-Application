class ChipIncrements {
    // white --> smallest
    // red --> 2nd smallest
    // blue --> 2nd largest
    // green --> largest

    ante;
    minBuyIn;
    maxBuyIn;
    chipUnits;
    smallest;
    secondSmallest;
    secondLargest;
    largest;

    constructor(ante, minBuyIn, maxBuyIn, chipUnits) {
        this.ante = ante;
        this.minBuyIn = minBuyIn;
        this.maxBuyIn = maxBuyIn;
        this.chipUnits = chipUnits;
    }

    initChips() {
        if (this.ante < 1.00) {
            this.secondLargest = 1;
            this.largest = 5;
        } else if (this.ante >= 1.00 && this.ante < 2.00) {
            this.secondLargest = 5;
            this.largest = 10;
        } else if (this.ante >= 2.00 && this.ante < 5.00) {
            this.secondLargest = 10;
            this.largest = 25;
        } else if (this.ante >= 5.00 && this.ante < 10.00) {
            this.secondLargest = 25;
            this.largest = 50;
        }

        this.smallest = (this.ante / 2);
        this.secondSmallest = this.ante;
    }


}

export default ChipIncrements