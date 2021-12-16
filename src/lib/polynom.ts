import { Monomial } from "./monomial";

/**
 * Just an array of monomials.
 */
export class Polynom {

  private monomials: Monomial[]

  // deep copying with combining like terms
  constructor(monomials: Monomial[]) {

    this.monomials = []

    for (let i = 0; i < monomials.length; i ++) {
      this.addMon(monomials[i].copy())
    }
  }

  copy(): Polynom {

    return new Polynom(this.monomials)
  }

  // tested
  isMonomial(): boolean {

    return this.monomials.length <= 1
  }

  // tested
  /**
   * @throws Error if Polymon contains more than one monomial
   * @returns Monomial(0, 0) if this.monomials is empty..
   */
  toMonomial(): Monomial {

    const len = this.monomials.length

    if (len === 0)
      return new Monomial(0, 0)
    if (len === 1)
      return this.monomials[0].copy()

    throw new Error(
      'Cannot convert Polynom obj to Monomial obj: \
      Polymon obj contains more than one Monomial'
    )
  }

  // tested
  /**
   * Alters current obj with removing
   * 0-coefficient monomials
   * @returns this
   */
  simplify(): Polynom {

    this.monomials = this.monomials.filter(el => el.getCoeff() != 0)

    return this
  }

  // tested
  /**
   * with combinig like terms
   */
  private addMon(mon: Monomial): void {

    const obj = this.monomials.find( (element, _index, _array) => {

      if (element.isSameDegree(mon))
        return true
      
      return false
    })

    if (obj === undefined) {
      this.monomials.push(mon)
      return
    }

    const idx = this.monomials.indexOf(obj)

    // degree is already the same
    this.monomials[idx] = mon.add(this.monomials[idx]).toMonomial()
  }

  // tested
  add(rhs: Polynom): Polynom {
    
    const res = new Polynom(this.monomials)

    for (let i = 0; i < rhs.monomials.length; i ++) {
      res.addMon(rhs.monomials[i])
    }

    return res
  }

  // simply tested
  sub(rhs: Polynom): Polynom {

    const minusRhs = new Polynom([])

    const mons = rhs.monomials
    for (let i = 0; i < mons.length; i ++) {

      minusRhs.monomials.push(mons[i].minus())
    }

    return this.add(minusRhs)
  }

  // tested
  multByNum(n: number): Polynom {
    
    const res = new Polynom([])

    for (let i = 0; i < this.monomials.length; i ++) {

      res.addMon(this.monomials[i].multByNum(n))
    }

    return res
  }

  // simply tested
  mult(pol: Polynom): Polynom {

    const lMons = this.monomials
    const rMons = pol.monomials

    const res = new Polynom([])

    for (let i = 0; i < lMons.length; i ++) {
      for (let j = 0; j < rMons.length; j ++) {

        res.addMon( 
          lMons[i].mult(rMons[j])
        )
      }
    }

    return res
  }

  /**
   * @param n non negative integer
   * @throws Error if power n is invalid
   * @returns powered Polynom
   */
  toDegree(n: number): Polynom {

    if (n === 0) 
      return new Polynom([new Monomial(1, 0)])

    if (Number.isInteger(n) && n > 0) {

      let res = this.copy()

      for (let i = 0; i < n - 1; i ++) {
        
        res = res.mult(this)
      }

      return res
    }
    
    throw new Error(`
        Invalid power degree: 
        Polynom can only be powered to a non negative integer degree
    `)
  }
}