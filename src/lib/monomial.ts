import { Polynom } from "./polynom"

/**
 * Immutable
 * Represents a single monomial e.g. 5x represents as {coeff: 5, degree: 1}
 */
export class Monomial {

  private coeff: number
  private degree: number
  
  /**
   * 
   * @param coeff if undefined sets 0
   * @param degree if undefined sets 0
   */
  constructor(coeff: number,
              degree: number) {

    this.coeff = coeff
    this.degree = degree
  }

  getCoeff() { return this.coeff }
  getDegree() { return this.degree }

  copy(): Monomial {
    
    return new Monomial(this.coeff, this.degree)
  }

  isSameDegree(other: Monomial): boolean {

    return this.degree === other.degree
  }

  // simply tested
  add(rhs: Monomial): Polynom {

    if (this.isSameDegree(rhs)) 
      return new Polynom([new Monomial(this.coeff + rhs.coeff, this.degree)])
    else
      return new Polynom([this.copy(), rhs.copy()])
  }

  // copy of mon with -coeff
  minus(): Monomial {

    return new Monomial( (-1) * this.coeff, this.degree)
  }

  sub(rhs: Monomial): Polynom {

    return this.add(rhs.minus())
  }

  multByNum(n: number): Monomial {

    return new Monomial( n * this.coeff, this.degree )
  }

  // simply tested
  mult(rhs: Monomial): Monomial {

    return new Monomial(this.coeff * rhs.coeff, this.degree + rhs.degree)
  }
}