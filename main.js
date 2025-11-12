const code = "10 + 5 - 2"
const exp = code.split(" ")
let position = 0

let curToken = exp[position]
position++
let peekToken = exp[position]

let Precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
}

function nextToken() {
    position++
    curToken = peekToken
    peekToken = exp[position]
}

function main() {
    let ast = parseExpression(0)
    console.log(ast)
}
main()

function parseExpression(precedence) {
    let leftExp = curToken

    nextToken()

    const peekPrecedence = getPrecedence(curToken)

    if (position < exp.length && precedence < peekPrecedence) {
        return parseRight(leftExp)
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