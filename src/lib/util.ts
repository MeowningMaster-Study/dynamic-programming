// to avoid mix up of names of variables
export const name = { 
  x1: 'x1',
  x2: 'x2', 
  x3: 'x3', 
  x4: 'x4', 
  x5: 'x5', 
  x6: 'x6', 
  numOfCoords: 6,
  u: 'u' 
}

export function min(arr: number[]): number {

  if (arr.length === 0)
    throw new Error(`
              Empty number array: cannot find min element of empty array
    `)

  let m = Number.MAX_SAFE_INTEGER

  arr.forEach(num => {

    if (num < m) {
      m = num
    }
  });

  return m
}

export function max(arr: number[]): number {

  if (arr.length === 0)
    throw new Error(`
              Empty number array: cannot find max element of empty array
    `)

    let m = Number.MIN_SAFE_INTEGER

    arr.forEach(num => {
  
      if (num > m) {
        m = num
      }
    });
  
    return m
}