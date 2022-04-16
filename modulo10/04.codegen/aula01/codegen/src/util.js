export default class Util {
    //marcos => [0] => m
    // first = m, rest = arcos
    static #transform({ str: [first, ...rest] , upperCase = true}) {
        if (!first) return ''
        const firstLetter = upperCase ? 
            first.toUpperCase() :
            first.toLowerCase()
        
        return [firstLetter, ...rest].join('')
    }

    static upperCaseFirstLetter(str) {
        return Util.#transform({str})
    }

    static lowerCaseFirstLetter(str) {
        return Util.#transform({str, upperCase: false})
    }
}