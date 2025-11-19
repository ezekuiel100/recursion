export function evaluate(ast) {
    if (typeof ast == "string") {
        const n = Number(ast)
        if (Number.isNaN(n)) {
            throw new Error(`Invalid number: ${ast}`)
        }
        return n
    }

    if (typeof ast !== "object" || ast === null) {
        throw new Error("Invalid AST node")
    }

    if (ast.left === undefined) {
        throw new Error("Invalid AST: missing left operand")
    }
    if (ast.right === undefined) {
        throw new Error("Invalid AST: missing right operand")
    }

    let left = evaluate(ast.left)
    let right = evaluate(ast.right)

    switch (ast.operator) {
        case "+": return left + right
        case "-": return left - right
        case "*": return left * right
        case "/": return left / right
        default:
            throw new Error(`Unknown operator: ${ast.operator}`)
    }
}


