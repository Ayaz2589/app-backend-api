const generateYearlyProfit = (): number => {
  const highProfitProbability = 0.8;
  const minProfit = 2000000;
  const maxProfit = 10000000;

  const randomProbability = Math.random();

  const generatedProfit = randomProbability < highProfitProbability
    ? Math.floor(Math.random() * (maxProfit - minProfit + 1)) + minProfit
    : Math.floor(Math.random() * (minProfit / 2)) + minProfit / 2;

  return Math.round(generatedProfit * 100) / 100;
};

const generateYearlyCost = (yearlyEarnings: number): number => {
  const minPercentage = 0.2;
  const maxPercentage = 0.5;

  const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
  const yearlyCost = yearlyEarnings * randomPercentage;
  return Math.round(yearlyCost * 100) / 100;
};

const generateMonthlyCosts = (yearlyCost: number): number[] => {
  const monthsInYear = 12;

  const randomPercentages: number[] = Array.from({ length: monthsInYear }, () => Math.random());
  const sumOfPercentages = randomPercentages.reduce((sum, percentage) => sum + percentage, 0);
  const normalizedPercentages = randomPercentages.map(percentage => percentage / sumOfPercentages);
  const monthlyCosts: number[] = normalizedPercentages.map(
    percentage => Math.round((percentage * yearlyCost) * 100) / 100
  );

  return monthlyCosts;
};

const calculateYearlyBalance = (yearlyCost: number): number => {
  const minMultiplier = 1;
  const maxMultiplier = 3;

  const randomMultiplier = Math.random() * (maxMultiplier - minMultiplier) + minMultiplier;
  const yearlyBalance = yearlyCost * randomMultiplier;

  return Math.round(yearlyBalance * 100) / 100;
};

const calculateRemainingBalance = (yearlyBalance: number, yearlyCost: number): number => {
  const remainingBalance = yearlyBalance - yearlyCost;

  return Math.round(remainingBalance * 100) / 100;
};

const calculateRemainingBalancePercentage = (yearlyBalance: number, yearlyCost: number): number => {
  const remainingBalance = yearlyBalance - yearlyCost;
  const remainingBalancePercentage = (remainingBalance / yearlyBalance) * 100;
  return Math.round(remainingBalancePercentage * 100) / 100;
};

const generateUserDashboardData = () => {
  const yearlyEarnings = generateYearlyProfit();
  const yearlyCost = generateYearlyCost(yearlyEarnings);
  const monthlyCosts = generateMonthlyCosts(yearlyCost);
  const yearlyBalance = calculateYearlyBalance(yearlyCost);
  const remainingBalance = calculateRemainingBalance(yearlyBalance, yearlyCost);
  const remainingBalancePercentage = calculateRemainingBalancePercentage(yearlyBalance, yearlyCost);

  return {
    yearlyEarnings,
    yearlyCost,
    monthlyCosts,
    yearlyBalance,
    remainingBalance,
    remainingBalancePercentage
  };
}

export default generateUserDashboardData;