
export function evaluate(ast) {
    if (typeof ast == "string") return Number(ast)

    let left = evaluate(ast.left)
    let right = evaluate(ast.right)

    switch (ast.operator) {
        case "+": return left + right
        case "-": return left - right
        case "*": return left * right
        case "/": return left / right
    }
}

