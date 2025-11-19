import test from "node:test"
import assert from "node:assert"
import { evaluate } from "../evaluate.js"

const table = [
    // 1. Operações simples
    {
        name: "simple addition",
        ast: { operator: '+', left: '2', right: '3' },
        expected: 5
    },
    {
        name: "simple subtraction",
        ast: { operator: '-', left: '7', right: '4' },
        expected: 3
    },
    {
        name: "simple multiplication",
        ast: { operator: '*', left: '3', right: '6' },
        expected: 18
    },
    {
        name: "simple division",
        ast: { operator: '/', left: '8', right: '2' },
        expected: 4
    },

    // 2. Encadeadas
    {
        name: "(2 + 3) + 4",
        ast: {
            operator: '+',
            left: { operator: '+', left: '2', right: '3' },
            right: '4'
        },
        expected: 9
    },
    {
        name: "(10 - 3) - 2",
        ast: {
            operator: '-',
            left: { operator: '-', left: '10', right: '3' },
            right: '2'
        },
        expected: 5
    },
    {
        name: "(2 * 3) * 4",
        ast: {
            operator: '*',
            left: { operator: '*', left: '2', right: '3' },
            right: '4'
        },
        expected: 24
    },
    {
        name: "(20 / 2) / 2",
        ast: {
            operator: '/',
            left: { operator: '/', left: '20', right: '2' },
            right: '2'
        },
        expected: 5
    },

    // 3. Expressões mistas
    {
        name: "2 + (3 * 4)",
        ast: {
            operator: '+',
            left: '2',
            right: { operator: '*', left: '3', right: '4' }
        },
        expected: 14
    },
    {
        name: "(2 * 3) + 4",
        ast: {
            operator: '+',
            left: { operator: '*', left: '2', right: '3' },
            right: '4'
        },
        expected: 10
    },
    {
        name: "(10 / 5) - 3",
        ast: {
            operator: '-',
            left: { operator: '/', left: '10', right: '5' },
            right: '3'
        },
        expected: -1
    },
    {
        name: "10 - (6 / 2)",
        ast: {
            operator: '-',
            left: '10',
            right: { operator: '/', left: '6', right: '2' }
        },
        expected: 7
    },

    // 4. Profundamente aninhado
    {
        name: "(((1 + 2) * 3) - 4) / 5",
        ast: {
            operator: '/',
            left: {
                operator: '-',
                left: {
                    operator: '*',
                    left: { operator: '+', left: '1', right: '2' },
                    right: '3'
                },
                right: '4'
            },
            right: '5'
        },
        expected: 1
    },

    // 5. Números negativos (se suportar)
    {
        name: "(-4) + 6",
        ast: {
            operator: '+',
            left: '-4',
            right: '6'
        },
        expected: 2
    },
    {
        name: "3 * (-2)",
        ast: {
            operator: '*',
            left: '3',
            right: '-2'
        },
        expected: -6
    },

    // 6. Divisões com decimal
    {
        name: "5 / 2",
        ast: { operator: '/', left: '5', right: '2' },
        expected: 2.5
    },
    {
        name: "(7 / 4) + (3 * 2)",
        ast: {
            operator: '+',
            left: { operator: '/', left: '7', right: '4' },
            right: { operator: '*', left: '3', right: '2' }
        },
        expected: 7.75
    },

    //7. Divisão por zero
    {
        name: "5 / 0",
        ast: { operator: '/', left: '5', right: '0' },
        expected: Infinity
    },
    {
        name: "8 / (4 - 4)",
        ast: {
            operator: '/',
            left: '8',
            right: { operator: '-', left: '4', right: '4' }
        },
        expected: Infinity
    },

    //8. Casos inválidos
    {
        name: "invalid operator %",
        ast: { operator: '%', left: '4', right: '2' },
        shouldThrow: true
    },
    {
        name: "missing left",
        ast: { operator: '+', right: '2' },
        shouldThrow: true
    },
    {
        name: "missing right",
        ast: { operator: '+', left: '2' },
        shouldThrow: true
    },
    {
        name: "node is not an object",
        ast: 5,
        shouldThrow: true
    }
];



test("evaluate", async (t) => {
    for (let testCase of table) {
        await t.test(testCase.name, () => {
            if (testCase.shouldThrow) {
                assert.throws(() => evaluate(testCase.ast))
                return
            }
            const res = evaluate(testCase.ast)

            assert.strictEqual(res, testCase.expected)
        })
    }
})