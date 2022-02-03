'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, fileName) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(fileName)
    }

    async showContent() {
        console.log((await readFile(fileName)).toString())
    }
}

watch(__filename, async (event, fileName) => {
    console.log((await readFile(fileName)).toString())
})

const file = new File()
// dessa forma, ele ignora o 'this' da classe File
// herda o this do watch!
// watch(__fileName, file.watch)

// alternativa para não herdar o this da função
// mas fica feio!
// watch(__fileName, (event, fileName) => file.watch(event, fileName))

// podemos deixar explícito qual é o contexto que a função deve seguir
// o bind retorn uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__fileName, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])
