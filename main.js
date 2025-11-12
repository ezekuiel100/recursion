const code = "10 + 5 - 2"
const exp = code.split(" ")
let position = 0

let curToken = exp[position]

function nextToken() {
    position++
    curToken = exp[position]
}


function main() {
    let ast = parseExpression()
    console.log(ast)
}
main()

function parseExpression() {
    let leftExp = curToken

    nextToken()

    if (position < exp.length) {
        return parseRight(leftExp)
    }

    return leftExp
}


function parseRight(left) {
    let exp = { operator: curToken, left }

    nextToken()

    exp = { ...exp, right: parseExpression() }

    return exp
}

