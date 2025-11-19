import test from "node:test"
import { parser } from "../main.js"
import assert from "node:assert"

test("parser", async (t) => {
    const table = [
        { input: "1 + 3", expected: { operator: '+', left: '1', right: '3' } },
        { input: "2 / 5 * 4", expected: { operator: '*', left: { operator: '/', left: '2', right: '5' }, right: '4' } },
        { input: "1 + 3 * 6", expected: { operator: '+', left: '1', right: { operator: '*', left: '3', right: '6' } } },
        {
            input: "5 + 3 - 1 * 2 / 7", expected: { operator: '-', left: { operator: '+', left: '5', right: '3' }, right: { operator: '/', left: { operator: '*', left: '1', right: '2' }, right: '7' } }
        },
    ]


    for (let testCase of table) {
        await t.test(testCase.input, () => {
            const ast = parser(testCase.input)
            assert.deepStrictEqual(ast, testCase.expected)
        })
    }

})

