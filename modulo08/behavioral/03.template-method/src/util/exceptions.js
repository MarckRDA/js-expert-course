class NotImplementedException extends Error {
    constructor(message) {
        super(`${message} as calle without an implementation`)
        this.name = 'NotImplementedException'
    }
}

export { NotImplementedException }