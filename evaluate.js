
export function evaluate(ast) {
    if (typeof ast == "string") return ast

    let left = evaluate(ast.left)
    let right = evaluate(ast.right)
    let op = ast.operator

    let res
    switch (op) {
        case "+":
            res = Number(left) + Number(right)
            break
        case "-":
            res = Number(left) - Number(right)
            break
        case "*":
            res = Number(left) * Number(right)
            break
        case "/":
            res = Number(left) / Number(right)
            break
    }

    return res
}

