const assert = require('assert')

// usado na maioria das vezes para listas de itens unicos 

const arr1 = [0, 1, 2]
const arr2 = [2, 0, 3]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), [0, 0, 1, 2, 2, 3])

const set = new Set()
arr1.map(i => set.add(i))
arr2.map(i => set.add(i))

//console.log('Set with add item per item', set)
assert.deepStrictEqual(Array.from(set), [0, 1, 2, 3])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [0, 1, 2, 3])

console.log('set keys', set.keys())
console.log('set values', set.values())

//no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has(3))

// mesma teoria do Map, mas você sempre trabalha com a lista toda
// nao tem get, entao você pode saber se o item está ou não no array e é isso.
// na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em uma lista e não
// tem na outra e assim por diante

// tem nos dois arrays
const user01 = new Set([
    'marcos',
    'maria',
    'xuxa'
])

const user02 = new Set([
    'joao',
    'marcos',
    'julio'
])

const intersection = new Set([...user01].filter(u => user02.has(u)))
assert.deepStrictEqual(Array.from(intersection), ['marcos'])

const difference = new Set([...user01].filter(u => !user02.has(u)))
assert.deepStrictEqual(Array.from(difference), ['maria', 'xuxa'])

// WeakSet

// mesma ideia do WeakMap
// não é enumerável (iterável)
// só travalha com chaves como referencia
// só tem metodos simples

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)