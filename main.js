import { evaluate } from "./evaluate.js"

let Precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
}

function parser(code) {
    const exp = code.split(" ")
    let position = 0

    let curToken = exp[position]
    position++
    let peekToken = exp[position]

    let ast = parseExpression(0)

    function nextToken() {
        position++
        curToken = peekToken
        peekToken = exp[position]
    }

    function parseExpression(precedence) {
        let leftExp = curToken

        nextToken()

        const peekPrecedence = getPrecedence(curToken)

        while (position < exp.length && precedence < peekPrecedence) {
            leftExp = parseRight(leftExp)
        }

        return leftExp
    }


    function parseRight(left) {
        let exp = { operator: curToken, left }

        const precedence = getPrecedence(curToken)
        nextToken()

        exp = { ...exp, right: parseExpression(precedence) }

        return exp
    }

    function getPrecedence(token) {
        if (Precedence[token]) return Precedence[token]

        return 0
    }

    return ast
}

const ast = parser("2 * 5 + 3")
const result = evaluate(ast)

console.log(result)

