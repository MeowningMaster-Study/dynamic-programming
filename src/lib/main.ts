import { calc, Constraints, Functional, Innitial, System } from './calc';

const n = 2;
const functional: Functional = {
  xInner: [1, 0],
  uInner: 1,
  xOuter: [1, 0]
};
const system: System = [
  { x: [1, 1], u: 2 },
  { x: [1, 0], u: 1 }
];
const initial: Innitial = [
  [-3, 0, 3],
  [-1, 0, 1],
  [-4, 0, 4]
];
const constraints: Constraints = [
  [-9, 0, 9],
  [-19, 0, 19]
];

<<<<<<< Updated upstream
const res = calc(n, functional, system, initial, constraints);
console.log(res);
=======
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
  const uResArray = [];
  {
    for (let i = 0; i < n; ++i) {
      uResArray.push(0);
    }
  }

  console.log(xResArray, uResArray)

  // REALIZATION

  return {
    x: xResArray,
    u: uResArray
  };
};
>>>>>>> Stashed changes
