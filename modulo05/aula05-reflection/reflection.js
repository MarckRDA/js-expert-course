'use strict'

const assert = require('assert')

// garantir semântica e segurança em objetos

// --- apply

const myObj = {
    add(myValue) {
        return this.arg1 + this.agr2 + myValue
    }
}

// Function.prototype.apply = () => { throw new TypeError('Eita!')}
//myObj.add.apply = function () { throw new Error('Ferrou tudo!')}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, agr2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Vixxxi!')} 

// esse aqui pode acontecer !
myObj.add.apply = function () { throw new TypeError('Vixxx!')}

assert.throws(
    () => myObj.add.apply({},[]),
    {
        name: 'TypeError',
        message: 'Vixxx!'
    }
)

// usando reflect:
// ----- apply
const result = Reflect.apply(myObj.add, { arg1: 40, agr2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// ------ defineProperty

// ----- questo~es semânticas 
function MyDate() {}

// feio pra kct, mesmo em JS tudo sendo Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there'})

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude!'})

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude!')

// ----- deleteProperty
const withDelete = { user: 'Marcos Alves' }
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Alberto José'}
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// ----- get

// Deveriamos fazer um get somente em instancias de referência 
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma excecão é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// ----- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))

// ownKyes
const user = Symbol('user')
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'Marcos Alves'
}

// com os métodos de object, temos que fazer 2 requisicoes
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser)
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])