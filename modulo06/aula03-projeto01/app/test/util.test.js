const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const { InvalidRegexError, evaluteRegex } = require('./../src/util')

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        /*
            fica rodando em loop e quebra tudo!
            catastrophic backtracking
            time \
            node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('awwww como tu vai voce e como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */
        expect(() => evaluteRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
    })

    it('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-z])$/
        expect(() => evaluteRegex(safeRegex)).to.not.throw
        expect(evaluteRegex(safeRegex)).to.be.ok
    })
})