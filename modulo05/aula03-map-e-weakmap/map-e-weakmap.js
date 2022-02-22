const assert = require('assert')
const myMap = new Map()

myMap
    .set(1, 'one')
    .set('Marcos', { text: 'two' })
    .set(true, () => 'hello')

const myMapWithContructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Marcos'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'MarcosAlves' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'MarcosAlves' })

// utilitarios
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

//para verificas se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Marcos' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformatico para o Javascript

assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([
    [ 1, 'one' ],
    [ 'Marcos', { text: 'two' } ],
    [ true, () => {} ]
  ]))

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString() === 'Hey'

//qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

//Nao da para limpar um Obj sem reassiná-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

/// ---------- WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beem específicos

// tem a maioria dos benefícios do Map
// MAS: não é iteravel
// Só chaves de referência e que você já conhece
// mais leve e previne leak de memória, porque depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)