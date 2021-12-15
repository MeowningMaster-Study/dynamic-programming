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
};

export const calc = (
  n: number, // к-сть кроків
  functional: Functional, // початковий ф-ціонал
  system: System, // 2х(2 + u) система
  xInnitial: Innitial, // початкові умови на х(i)
  uConstraints: Constraints // обмеження на u(i)
): Result => {
  const xResultArray = [];
  {
    const row1 = [];
    for (let i = 0; i < n + 1; ++i) {
      row1.push(0);
    }
    xResultArray.push(row1);

    const row2 = [];
    for (let i = 0; i < n + 1; ++i) {
      row2.push(0);
    }
    xResultArray.push(row2);
  }
  const uResArray = [];
  {
    for (let i = 0; i < n; ++i) {
      uResArray.push(0);
    }
  }

  // REALIZATION

  return {
    x: xResultArray,
    u: uResArray
  };
};
