import { bellmanStep } from "./step";
import { BellmanExpression } from "./step";
import { InFunctional } from "./step";

export type Functional = {
  xInner: number[]; // _x1 & _x2
  uInner: number; // _u
  xOuter: number[]; // _x1(n + 1) & _x2(n + 1)
};

export type System = { x: number[], u: number }[]; // [[_x1, _x2, _u], [_x1, _x2, _u]]
export type Innitial = number[][]; // [[...], [...]]
export type Constraints = number[][]; // [[...], ... , [...]]  n + 1 inner arrays

export type Result = {
  x: number[][]; // [[x10, ..., x1n], [x20, ..., x2n]]
  u: number[]; // [u0, ..., u(n - 1)]
};

export const calc = (
  n: number, // к-сть кроків
  functional: Functional, // початковий ф-ціонал
  system: System, // 2х(2 + u) система
  xInnitial: Innitial, // початкові умови на х(i)
  uConstraints: Constraints // обмеження на u(i)
): Result => {
  const xResArray = [];
  {
    const row1 = [];
    for (let i = 0; i < n + 1; ++i) {
      row1.push(0);
    }
    xResArray.push(row1);

    const row2 = [];
    for (let i = 0; i < n + 1; ++i) {
      row2.push(0);
    }
    xResArray.push(row2);
  }
  const uResArray: number[] = [];

  // ******************** 👇 change here

  const funct: InFunctional = {
        xCoeff: functional.xInner,
        u: 0
  }

  const expr: BellmanExpression = {
        xCoeff: functional.xOuter,
        freeMem: 0,
        chosenU: undefined
  }

  for (let i = n; i >= 0; i --) {

    const bellmanExpr = bellmanStep(
                                    system,
                                    funct,
                                    expr,
                                    uConstraints[i]
    )

    uResArray.unshift(bellmanExpr.chosenU)
  }

  console.log(uResArray);
  
  

  // ********************** 👆 change there

  return {
    x: xResArray,
    u: uResArray
  };
};
