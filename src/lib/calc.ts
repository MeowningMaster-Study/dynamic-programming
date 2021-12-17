import { bellmanStep } from './step';
import { BellmanExpression } from './step';
import { InFunctional } from './step';
import { max, min } from './util';

export type Functional = {
  xInner: number[]; // _x1 & _x2
  uInner: number; // _u
  xOuter: number[]; // _x1(n + 1) & _x2(n + 1)
};

export type System = { x: number[]; u: number }[]; // [[_x1, _x2, _u], [_x1, _x2, _u]]
export type Innitial = number[][]; // [[...], [...]]
export type Constraints = number[][]; // [[...], ... , [...]]  n + 1 inner arrays

export type Result = {
  x: number[][]; // [[x10, ..., x1n], [x20, ..., x2n]]
  u: number[]; // [u0, ..., u(n - 1)]

  bellmanSteps?: {
    x: number[]; // coeffs before x_k
    freeNum: number; // obtained from chosen u(i)
  }[]; // (n + 1) times calc Bellman function
};

export const calc = (
  n: number, // к-сть кроків
  functional: Functional, // початковий ф-ціонал
  system: System, // 2х(2 + u) система
  xInnitial: Innitial, // початкові умови на х(i)
  uConstraints: Constraints // обмеження на u(i)
): Result => {
  /**
   * number of phase coordinates
   */
  const countXk = xInnitial.length;

  const xResArray: number[][] = new Array(countXk)
    .fill(0)
    .map(() => new Array(0));

  const uResArray: number[] = [];

  // ******************** 👇 change here

  const funct: InFunctional = {
    xCoeff: functional.xInner,
    u: 0
  };

  const expr: BellmanExpression = {
    xCoeff: functional.xOuter,
    freeMem: 0,
    chosenU: undefined
  };

  let bellmanExpr: BellmanExpression = undefined;

  for (let i = n; i >= 0; i--) {
    bellmanExpr = bellmanStep(system, funct, expr, uConstraints[i]);

    uResArray.unshift(bellmanExpr.chosenU);
  }

  let xVals: Array<number> = new Array(countXk).fill(0);

  // choose x_k(0) TESTED
  for (let k = 0; k < countXk; k++) {
    let chosenX = 0;

    if (bellmanExpr.xCoeff[k] < 0) {
      chosenX = max(xInnitial[k]);
    } else {
      chosenX = min(xInnitial[k]);
    }

    xResArray[k].push(chosenX);

    xVals[k] = chosenX;
  }

  const xValNext: Array<number> = new Array(countXk).fill(0);

  // choose x_k(i) depends on x_k(i - 1)
  for (let i = 1; i < n + 2; i++) {
    for (let k = 0; k < countXk; k++) {
      /*
       * calc x_k(i) coordinate depends on
       * x_1(i - 1), ... , x_countXk(i - 1) & u
       */

      let xkNextVal = 0;

      // // logging
      // console.log('xVals(' + (i - 1) + ') = ' + xVals);

      xResArray[k].push(
        (xkNextVal = calcNextXki(
          { x: system[k].x, u: system[k].u },
          xVals,
          uResArray[i - 1]
        ))
      );

      xValNext[k] = xkNextVal;
    }

    // logging
    for (let j = 1; j <= countXk; j++) {
      console.log('x_' + j + '(' + i + ') = ' + xValNext[j - 1]);
    }

    xVals = [...xValNext];
  }

  // logging
  console.log('*** Results of x_k(i) ***');
  console.log(xResArray);
  console.log('*** Result of u(i) ***');
  console.log(uResArray);

  // ********************** 👆 change there

  return {
    x: xResArray,
    u: uResArray

    // TODO bellmanSteps
  };
};

function calcNextXki(
  equation: {
    // equation from with to calc x_k
    x: number[]; // coeffs before x_k
    u: number; // coeff before u
  },
  xVals: Array<number>, // values of x_k(i - 1)
  uVal: number // value of u(i - 1)
): number {
  // // logging
  // console.log('equation.x = ' + equation.x);
  // console.log('equation.u = ' + equation.u);
  // console.log('xVals = ' + xVals);
  // console.log('uVal = ' + uVal);

  let res = 0;

  const countXk = equation.x.length;

  for (let k = 0; k < countXk; k++) {
    res += equation.x[k] * xVals[k];
  }

  res += equation.u * uVal;

  return res;
}
