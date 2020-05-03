const Probability: any = require('./Probability');

let portfolio: number = 300;
const originalPortfolio: number = portfolio;
const risk: number = 0.01;
const reward: number = 0.03;
const winRate: string = '70%';
const lossRate: string = '30%';
const findBreakEvenRate = (risk: number, reward: number): string => {
    const raw: number = risk / (risk + reward) * 100;
    return `${raw}%`
}
const breakEvenRate: string = findBreakEvenRate(risk, reward);

const numOfTrades: number = 100;

console.log(`
Starting Portfolio = ${originalPortfolio}
Risk:Reward = ${risk*100}:${reward*100}
Win Rate = ${winRate}
Break-Even Rate = ${breakEvenRate}

Simulating ${numOfTrades} trades...
`)

const payout = (currentPortfolio: number, tradeOutcome: Boolean): number => {
    if (tradeOutcome === true) {
        return currentPortfolio * reward;
    }
    return currentPortfolio * risk * -1;
}

const decideOutcome: any = new Probability({
    p: winRate,
    f: () => {
        return true;
    }
}, {
    p: lossRate,
    f: () => {
        return false;
    }
});

for (let i = 1; i <= numOfTrades; i++) {
    let outcome = decideOutcome();
    let earned = payout(portfolio, outcome);
    portfolio += earned;
    console.log(`Portfolio after trade #${i}: $${parseFloat(portfolio.toPrecision(10))} ${outcome ? 'Win' : 'Loss'} ${outcome ? '+' : '-'}$${Math.abs(parseFloat(earned.toPrecision(10)))}`);
}

const growth = (portfolio - originalPortfolio) / originalPortfolio;

console.log(`\nFinal portfolio: $${parseFloat(portfolio.toPrecision(10))}`);
console.log(`\n% growth after ${numOfTrades} trades: ${parseFloat(growth.toPrecision(6)) * 100}%`);
