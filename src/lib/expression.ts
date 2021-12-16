import { Term } from "./term";

/**
 * Represents mathematical expression.
 * Each term does not explicitely have
 * a degree property, because for our goals
 * it is useless; but it is alwayse possible
 * to encode degree sumway into sort property
 */
export class Expression {

  private expr: Term[]

  // deep copying of argument with combining like terms
  constructor(e: Term[]) {

    this.expr = []

    for (let i = 0; i < e.length; i ++) {
        this._add(e[i].copy())
    }
  }

  /**
   * Create new object
   */
  add(other: Expression): Expression {

    const res = new Expression(this.expr)

    for (let i = 0; i < other.expr.length; i++) {

        res._add(other.expr[i].copy())
    }

    return res
  }

  /**
   * Removes and returns coefficient before term with sort termSort
   * @param termSort name of term sort kind to looking for
   * @returns undefined if term was not found
   */
  find(termSort: string): number {
    
    const res = this.expr.find((element, _index, _array) => {

      if (element.getSort() === termSort) {
        return true
      }

      return false
    })

    return res == undefined ? undefined : res.getCoeff()
  }
  
  /**
   * With combining like terms. Should be
   * passed a copy of an object
   * @param addition new or old kind of monomial
   * @returns number of unique kind of terms
   */
   private _add(addition: Term): number {

    const like = this.expr.find(el => el.isLike(addition))

    if (like === undefined) {
      this.expr.push(addition)
      return
    }

    const idx = this.expr.indexOf(like)
    this.expr[idx].addCoeff(addition.getCoeff())

    return this.expr.length
  }

}