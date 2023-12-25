export default function calculatePortfolio(
  expextIncome: number,
  expextReturn: number,
) {
  if (expextReturn == 4 && expextIncome == 0) {
    return { absolute_return: 50, capital_growth: 20, capital_yield: 30 };
  } else if (expextReturn == 4 && expextIncome == 2) {
    return { absolute_return: 50, capital_growth: 10, capital_yield: 40 };
  } else if (expextReturn == 6 && expextIncome == 0) {
    return { absolute_return: 30, capital_growth: 30, capital_yield: 40 };
  } else if (expextReturn == 6 && expextIncome == 2) {
    return { absolute_return: 40, capital_growth: 30, capital_yield: 30 };
  } else if (expextReturn == 6 && expextIncome == 3) {
    return { absolute_return: 40, capital_growth: 20, capital_yield: 40 };
  } else if (expextReturn == 8 && expextIncome == 0) {
    return { absolute_return: 10, capital_growth: 50, capital_yield: 40 };
  } else if (expextReturn == 8 && expextIncome == 2) {
    return { absolute_return: 20, capital_growth: 50, capital_yield: 30 };
  } else if (expextReturn == 8 && expextIncome == 3) {
    return { absolute_return: 20, capital_growth: 40, capital_yield: 40 };
  } else if (expextReturn == 8 && expextIncome == 4) {
    return { absolute_return: 30, capital_growth: 40, capital_yield: 30 };
  } else if (expextReturn == 10 && expextIncome == 2) {
    return { absolute_return: 0, capital_growth: 80, capital_yield: 20 };
  } else if (expextReturn == 10 && expextIncome == 3) {
    return { absolute_return: 0, capital_growth: 70, capital_yield: 30 };
  } else if (expextReturn == 10 && expextIncome == 4) {
    return { absolute_return: 0, capital_growth: 60, capital_yield: 40 };
  } else if (expextReturn == 10 && expextIncome == 5) {
    return { absolute_return: 10, capital_growth: 60, capital_yield: 30 };
  } else {
    return { absolute_return: 0, capital_growth: 0, capital_yield: 0 };
  }
}
