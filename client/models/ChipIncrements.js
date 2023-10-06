class ChipIncrements {
    // white --> smallest
    // red --> 2nd smallest
    // blue --> 2nd largest
    // green --> largest

    ante;
    minBuyIn;
    maxBuyIn;
    chipUnits;

    constructor(ante, minBuyIn, maxBuyIn, chipUnits) {
        this.ante = ante;
        this.minBuyIn = minBuyIn;
        this.maxBuyIn = maxBuyIn;
        this.chipUnits = chipUnits;
    }


}

export default ChipIncrements