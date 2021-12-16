import { System } from "./calc";
import { Expression } from "./expression";
import { Term } from "./term";
import { name, min, max } from "./util";

//*** types desined for different number of phase coordinats ***//

/**
 * Inner expression of Q functional.
 * xCoeff.length must be the same 
 * for each individual task
 */
export type InFunctional = {
  xCoeff: number[],   // _x1(i) & _x2(i)
  u: number           // _u(i)
}

/**
 * Innitially adds to a functional on step (n + 1).
 * Adds to functional on other steps also (then 
 * expected freeMem != 0).
 * Also represents results of computations
 */ 
export type BellmanExpression = {
  xCoeff: number[]    // _x1 & _x2
  freeMem: number     // value obtained from u (just a number), innitially 0
  chosenU: number     // value of chosen u(i) after computing bellmanStep (only for result)
}

////////// main function ////////////

/**
 * Evaluetes Bellman's function for target number of step,
 * which is unimportant for function's executing
 * @param system n equations like x_k(i+1) = a1*x_1(i) + ... + an*x_n(i) + b*u(i)
 * @param funct 
 * @param expr 
 * @param uConstraints 
 * @returns 
 */
export function bellmanStep(
                              system: System,
                              funct: InFunctional,
                              expr: BellmanExpression,
                              uConstraints: number[]
                            ) : BellmanExpression {

    // funct -> Expression
    const f = funcToExpr(funct)

    // expr -> Expression
    const a = addToExpr(expr, system)

    /*
    * sum contains
    * a1*x1(i) + ... + an*xn(i) + b*u(i)
    */
    const sum = f.add(a)

    /*
    * get coeff before u
    * if positive - find min of constraint
    * if negative - find max of constraint
    * assign it to res.freeMem
    */

    let chosen = 0

    // init BellmanExpression.freeMem
    const uCoeff = sum.find('u')
    if (uCoeff < 0) {
      chosen = max(uConstraints)
    } else {
      chosen = min(uConstraints)
    }

    // init BellmanExpression.xCoeff
    const xCoff: number[] = []

    for (let k = 1; k <= funct.xCoeff.length; k ++) {

      const cf = xCoff.push(sum.find('x' + k))
      xCoff.push(cf === undefined ? 0 : cf)
    }


    return {
      xCoeff: xCoff,     
      freeMem: expr.freeMem + chosen,
      chosenU: chosen
    }
}

function funcToExpr(funct: InFunctional): Expression {

  const num = funct.xCoeff.length
  if (num === 0 || num > name.numOfCoords)
      throw new Error(`
          Unappropriate number of phase coordinates: ${num}
      `)

  const terms = [new Term(funct.u, name.u)]

  for (let i = num; i > 0; i --) {

    terms.unshift(new Term(
      funct.xCoeff[i - 1], 
      name['x' + i]
      )
    )
  }

  return new Expression(terms)

}

/**
 * Converts AddExpression (i + 1) time to 
 * simple Expression at time (i). 
 * Does not touch expr.freeMem
 * @param expr AddExpression at time (i + 1)
 * @param system rules we follow to extend the AddExpression
 * @returns Expression at time (i)
 */
function addToExpr(
                  expr: BellmanExpression,
                  system: System
  ): Expression {

  // number of phase coordinates
  const num = expr.xCoeff.length
  if (num === 0 || num > name.numOfCoords)
      throw new Error(`
          Unappropriate number of phase coordinates: ${num}
      `)

  const terms: Term[] = []

  for (let i = num - 1; i >= 0; i --) {

    // TODO
    expendToTime(
                  num,
                  expr.xCoeff[i],
                  {x: system[i].x, u: system[i].u},
                  terms
                )
  }

  return new Expression(terms)

}

/**
 * Adds terms to the expression from the following law:
 * for target x_k(i + 1) expends it following the rule
 * x_k(i + 1) = a1*x_1(i) + ... + an*x_n(i) + b*u(i)
 * which is defined by ext
 * @param n number of phase coordinates
 * @param coeff mult by
 * @param ext rule of conversion: x_k(i + 1) = ...
 * @param terms each new term will be added here
 */
function expendToTime(
                      n: number,
                      coeff: number,
                      ext: {x: number[], u: number},
                      terms: Term[]
                      ) {
    
    if (coeff === 0) return

    // add n times x_k (in ext rule)
    for (let k = 1; k <= n; k ++) {
      
      terms.unshift(new Term(
                          coeff * ext.x[k - 1],
                          name['x' + k] 
                         )
                )
    }

    terms.unshift(new Term(
                        coeff * ext.u,
                        name['u'] 
                       )
              )
}