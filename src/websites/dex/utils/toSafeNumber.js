import BigNumber from 'bignumber.js';

export default function toSafeNumber(originNumber, decimals) {
    if (originNumber == 0 || originNumber == '0') {
        return 0;
    }
    const bigBalance = new BigNumber(originNumber.toString());
    const denom = new BigNumber(10).pow(decimals);
    const safeBalance = bigBalance.dividedBy(denom).toNumber();

    return safeBalance;
}