import {
  calc,
  Functional,
  System,
  Innitial,
  Constraints,
  Result
} from './main';

test('mdk', () => {
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

  const res = calc(n, functional, system, initial, constraints);
  const mustBe: Result = {
    x: [
      [-9, -34, -48, -91],
      [-19, -12, -35, -52]
    ],
    u: [-3, -1, -4]
  };
  expect(res).toEqual(mustBe);
});
