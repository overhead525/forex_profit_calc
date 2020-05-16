const Probability: any = require('./Probability');

let portfolio: number = parseFloat(process.argv[2]);
const originalPortfolio: number = portfolio;
const risk: number = 0.05;
const reward: number = 0.25;
const winRate: string = '55%';
const lossRate: string = '45%';
const findBreakEvenRate = (risk: number, reward: number): string => {
    const raw: number = risk / (risk + reward) * 100;
    return `${raw}%`
}
const breakEvenRate: string = findBreakEvenRate(risk, reward);

const numOfTrades: number = 50;  // number of trades during ONE trading season

console.log(`
Starting Portfolio = ${originalPortfolio}
Risk:Reward = ${risk*100}:${reward*100}
Win Rate = ${winRate}
Break-Even Rate = ${breakEvenRate}

${/*Simulating ${numOfTrades} trades...*/null}
`)

const averageNumArray = (arrNums: Array<number>) => {
    return arrNums.reduce((a, b) => (a + b)) / arrNums.length;
}

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

const resultsArray: Array<number> = [];
const growthArray: Array<number> = [];

const simulateXTrades = (): void => {
    for (let i = 1; i <= numOfTrades; i++) {
        let outcome: boolean = decideOutcome();
        let earned: number = payout(portfolio, outcome);
        portfolio += earned;
        // console.log(`Portfolio after trade #${i}: $${parseFloat(portfolio.toPrecision(10))} ${outcome ? 'Win' : 'Loss'} ${outcome ? '+' : '-'}$${Math.abs(parseFloat(earned.toPrecision(10)))}`);
    }
    
    const growth: number = (portfolio - originalPortfolio) / originalPortfolio;

    const finalPortfolio = parseFloat(portfolio.toPrecision(10));    
    // console.log(`\nFinal portfolio: $${finalPortfolio}`);
    resultsArray.push(finalPortfolio);
    
    const neatGrowth = parseFloat(growth.toPrecision(6)) * 100;
    // console.log(`\n% growth after ${numOfTrades} trades: ${parseFloat(growth.toPrecision(6)) * 100}%`);
    growthArray.push(neatGrowth);

    // RESETS
    portfolio = originalPortfolio;
}

const getSimulations = (numSimulations: number): void => {
    for (let i = 1; i <= numSimulations; i++) {
        simulateXTrades();
    }

    const averageFinalPortfolio: number = averageNumArray(resultsArray);
    const averageGrowth: number = averageNumArray(growthArray);

    console.log(`
    After ${numSimulations} simulations of ${numOfTrades} trades, you had
    - an average final portfolio of $${averageFinalPortfolio};
    - an average growth of ${averageGrowth}%
    `);

    console.log('END');
}

getSimulations(1000000);
