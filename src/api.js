import cloneDeep from "lodash/cloneDeep";

export const calcScore = (price) => {
  if (price < 50) return 0;
  if (price < 100) return price - 50;
  return (price - 100) * 2 + 50;
}

export const getTransactions = async (monthsAgo) => {
  const response = await fetch('http://localhost:3005/transactions/monthsAgo');
  const data = await response.json();
  const transactionsByMonth = data.reduce(( acc, each ) => {
     const clonedAcc = cloneDeep(acc);
     if( clonedAcc[each.month] ) {
      clonedAcc[each.month] = {
        transactions: [
          ...clonedAcc[each.month].transactions,
          each
        ]
      };
     } else {
      clonedAcc[each.month] = {
        transactions: [each],
      };
     }

     return clonedAcc;
  }, {});

  // Caliculate total moneySpent, points earned
  Object.keys(transactionsByMonth).forEach((each) => {
    const totals = transactionsByMonth[each].transactions.reduce(({ score, moneySpent }, { purchaseAmount }) => {
      moneySpent += purchaseAmount;
      score += calcScore(purchaseAmount);
      return { score, moneySpent };
    }, { score: 0, moneySpent: 0 });

    transactionsByMonth[each].moneySpent = totals.moneySpent;
    transactionsByMonth[each].score = totals.score;
  });

  return transactionsByMonth;
};