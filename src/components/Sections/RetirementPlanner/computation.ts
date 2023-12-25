import { InitialState, RetirementPlan } from './constants';

export function generateAgesUntilRetirement(currentAge: number) {
  let ageArray = [];
  for (let i = currentAge; i <= 85; i++) {
    ageArray.push(i);
  }
  return ageArray;
}

function canRetire(t: number, e: number, n: number, i: number, r: number) {
  for (var a = n, o = !1, s = 0; s < t; s++)
    o ? (a += 0.02 * a) : ((a = a), (o = !0)), (e += e * i), (e -= a);
  return e >= r;
}

function calculateAB(t: string, e: number, n: number, i: number, r: number) {
  for (
    var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 85,
      o = n > 0 ? 12 * n : 0,
      s = 0,
      l = 0,
      u = 0,
      d = 0.01,
      c = !1,
      h = 0,
      f = a - i,
      g = 0,
      m = 'PLAN' === t ? 0.0877873653173446 : 0,
      p = 0.02;
    !c;

  ) {
    var v = [],
      y = i,
      b = e;
    1 === (g += 1) ? (s = e) : (s *= 1 + u / s / 1e4);
    for (var _ = s, x = _, w = 0; w <= f; w++) {
      if (y < r) (b += Math.round(b * m + o)), v.push(b);
      else if (((b = b + Math.round(b * m) - (x += x * p)), v.push(b), y == a))
        (l = (u = b) / s) <= d && l >= -d && (c = !0);
      else if (y === r) {
        var k = x;
        h = Math.round(k / 12);
      }
      y++;
    }
    if (c)
      return {
        targetMonthlyPayments: h,
        breakdown: v.map(function (t) {
          return parseFloat(t.toFixed(4));
        }),
      };
  }
  return null;
}

function calculateAC(
  t: string,
  e: number,
  n: number,
  i: number,
  r: number,
  a: number,
) {
  for (
    var o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 85,
      s = n > 0 ? 12 * n : 0,
      l = 0,
      u = 0,
      d = !1,
      c = 0,
      h = 100,
      f = o - i,
      g = 0,
      m = 'PLAN' === t ? 0.0877873653173446 : 0,
      p = 0.02,
      v = a;
    !d;

  ) {
    var y = [],
      b = i,
      _ = e;
    1 == (g += 1) ? (l = e) : (l *= 1 + (u -= a) / l / 1e4);
    for (var x = l, w = x, k = 0; k <= f; k++) {
      if (b < r) (_ += Math.round(_ * m + s)), y.push(_);
      else if (((_ = _ + Math.round(_ * m) - (w += w * p)), y.push(_), b === o))
        (u = _),
          a - Math.round(u) <= h &&
            Math.round(a - Math.round(u)) >= -h &&
            (d = !0);
      else if (b === r) {
        var M = w;
        c = Math.round(M / 12);
      }
      b++;
    }
    if (d)
      return {
        targetMonthlyPayments: c,
        breakdown: y.map(function (t) {
          return parseFloat(t.toFixed(4));
        }),
        portfolioBalance: v,
      };
  }
  return null;
}

export function calculateBC(
  t: string,
  e: string,
  n: number,
  i: number,
  r: number,
  a: number,
  o: number,
) {
  for (
    var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 85,
      l = [],
      u = 'BC' === e ? o : 0,
      d = s + 1,
      c = 'PLAN' === t ? 0.0877873653173446 : 0,
      h = r,
      f = 12 * i,
      g = 12 * a,
      m = g,
      p = n,
      v = 0.02,
      y = !1;
    !canRetire(d - h, p, g, c, u);

  )
    (p = p + p * c + f), l.push(Math.round(p)), h++;
  for (var b = h, _ = !1; h < s + 1; )
    _ && (m += m * v),
      (p = p + p * c - m),
      l.push(Math.round(p)),
      h++,
      (_ = !0);
  return {
    retirementAge: b,
    breakdown: l,
    remainingBalance: Math.round(p),
    scenarioFailed: y,
  };
}

export function computeRetirementPlan(state: InitialState) {
  const {
    retirementPlan,
    currentAge: n,
    retirementAge: r,
    monthlyContribution: e,
    initialInvestmentAmount: t,
    monthlyIncome: l,
    inheritanceAmount: d,
  } = state;

  const ages = generateAgesUntilRetirement(n);

  if (
    retirementPlan?.length === 1 &&
    retirementPlan[0] === RetirementPlan.RETIRE
  ) {
    //A
    const resultTFO = calculateAB('PLAN', t, e, n, r);
    const resultCash = calculateAB('CASH', t, e, n, r);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO:
          (resultTFO?.breakdown[index] || 0) < 0
            ? 0
            : resultTFO?.breakdown[index],
        CASH:
          (resultCash?.breakdown[index] || 0) < 0
            ? 0
            : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: resultTFO?.targetMonthlyPayments,
      cashTargetMonthlyPayments: resultCash?.targetMonthlyPayments,
      tfoRetirementAge: r,
      cashRetirementAge: r,
    };
  } else if (
    retirementPlan?.length === 1 &&
    retirementPlan[0] === RetirementPlan.STABLE_MONTHLY
  ) {
    //B
    const resultTFO = calculateBC('PLAN', 'B', t, e, n, l, 0);
    const resultCash = calculateBC('CASH', 'B', t, e, n, l, 0);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO: resultTFO?.breakdown[index] < 0 ? 0 : resultTFO?.breakdown[index],
        CASH:
          resultCash?.breakdown[index] < 0 ? 0 : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: l,
      cashTargetMonthlyPayments: l,
      tfoRetirementAge: resultTFO?.retirementAge,
      cashRetirementAge: resultCash?.retirementAge,
      tfoRemainingBalance: resultTFO?.remainingBalance,
      cashRemainingBalance: resultCash?.remainingBalance,
    };
  } else if (
    retirementPlan?.length === 1 &&
    retirementPlan[0] === RetirementPlan.PASS_ON
  ) {
    //C
    const resultTFO = calculateAC('PLAN', t, e, n, r, d);
    const resultCash = calculateAC('CASH', t, e, n, r, d);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO:
          (resultTFO?.breakdown[index] || 0) < 0
            ? 0
            : resultTFO?.breakdown[index],
        CASH:
          (resultCash?.breakdown[index] || 0) < 0
            ? 0
            : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: resultTFO?.targetMonthlyPayments,
      cashTargetMonthlyPayments: resultCash?.targetMonthlyPayments,
      tfoRetirementAge: r,
      cashRetirementAge: r,
      tfoRemainingBalance: resultTFO?.portfolioBalance,
      cashRemainingBalance: resultCash?.portfolioBalance,
    };
  } else if (
    retirementPlan?.length === 2 &&
    retirementPlan.includes(RetirementPlan.RETIRE) &&
    retirementPlan.includes(RetirementPlan.STABLE_MONTHLY)
  ) {
    //AB
    const resultTFO = calculateAB('PLAN', t, e, n, r);
    const resultCash = calculateAB('CASH', t, e, n, r);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO:
          (resultTFO?.breakdown[index] || 0) < 0
            ? 0
            : resultTFO?.breakdown[index],
        CASH:
          (resultCash?.breakdown[index] || 0) < 0
            ? 0
            : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: resultTFO?.targetMonthlyPayments,
      cashTargetMonthlyPayments: resultCash?.targetMonthlyPayments,
      tfoRetirementAge: r,
      cashRetirementAge: r,
    };
  } else if (
    retirementPlan?.length === 2 &&
    retirementPlan.includes(RetirementPlan.STABLE_MONTHLY) &&
    retirementPlan.includes(RetirementPlan.PASS_ON)
  ) {
    //BC
    const resultTFO = calculateBC('PLAN', 'B', t, e, n, l, 0);
    const resultCash = calculateBC('CASH', 'B', t, e, n, l, 0);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO: resultTFO?.breakdown[index] < 0 ? 0 : resultTFO?.breakdown[index],
        CASH:
          resultCash?.breakdown[index] < 0 ? 0 : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: l,
      cashTargetMonthlyPayments: l,
      tfoRetirementAge: resultTFO?.retirementAge,
      cashRetirementAge: resultCash?.retirementAge,
      tfoRemainingBalance: resultTFO?.remainingBalance,
      cashRemainingBalance: resultCash?.remainingBalance,
    };
  } else if (
    retirementPlan?.length === 2 &&
    retirementPlan.includes(RetirementPlan.RETIRE) &&
    retirementPlan.includes(RetirementPlan.PASS_ON)
  ) {
    //AC
    const resultTFO = calculateAC('PLAN', t, e, n, r, d);
    const resultCash = calculateAC('CASH', t, e, n, r, d);

    const chartData = ages.map((age, index) => {
      return {
        age,
        TFO:
          (resultTFO?.breakdown[index] || 0) < 0
            ? 0
            : resultTFO?.breakdown[index],
        CASH:
          (resultCash?.breakdown[index] || 0) < 0
            ? 0
            : resultCash?.breakdown[index],
      };
    });
    return {
      chartData,
      tfoTargetMonthlyPayments: resultTFO?.targetMonthlyPayments,
      cashTargetMonthlyPayments: resultCash?.targetMonthlyPayments,
      tfoRetirementAge: r,
      cashRetirementAge: r,
      tfoRemainingBalance: resultTFO?.portfolioBalance,
      cashRemainingBalance: resultCash?.portfolioBalance,
    };
  } else {
    //default
    return {};
  }
}
