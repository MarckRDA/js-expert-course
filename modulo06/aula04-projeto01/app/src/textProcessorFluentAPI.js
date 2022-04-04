// o objetivo de Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chma o build. MUITO similar ao padrão Builder
// sobre construção
// de objetos
const Person = require('./person')
const { evaluteRegex } = require('./util')

class TextProcessorFluentAPI {
    #content
    constructor(content) {
        this.#content = content
    }
    
    extractPeopleData() {
        // ?<= fata que vai extrair os dados que virao depois desse grupo
        // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressão para pegar maiusculo e minusculo)
        // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar "vamos pegar daí para frente"

        // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> insensitive

        const matchPerson = evaluteRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi) 
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluteRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluteRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }

    mapPerson() {
        //passa o array de itens no construtor de person
        this.#content = this.#content.map(item => new Person(item))
        return this
    }

    build() {
        return this.#content 
    }
}

module.exports = TextProcessorFluentAPI