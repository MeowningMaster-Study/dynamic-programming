

/**
 * Mutable
 * Uses to represent addition in mathematical
 * expression. Characterized with coefficient
 * 'coeff' and kind 'sort' to differenciate one
 * kind of Additions from another.
 * Supports only addition and multiplication by
 * number math operations. Does not have a 
 * degree property
 */
export class Term {
  
  private coeff: number
  private sort: string

  constructor(
              coefficient: number,
              sort: string) {
    
    this.coeff = coefficient;
    this.sort = sort;
  }

  copy(): Term { return new Term(this.coeff, this.sort) }

  getCoeff(): number { return this.coeff }
  getSort(): string { return this.sort }

  addCoeff(value: number) { this.coeff += value }

  isLike(other: Term): boolean { return this.sort === other.sort }

  /**
   * Alter an object
   * @returns this
   */
  multByNumber(n: number): Term { this.coeff *= n; return this }
};