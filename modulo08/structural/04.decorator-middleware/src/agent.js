import Http from 'http'

async function InjecHttpInterceptor() {
    const onEmit = Http.Server.prototype.emit
    Http.Server.prototype.emit = function(...args) {
        const [type, req, response] = args

        if (type === 'request') {
            response.setHeader('X-Instrumented-by', 'MarcosAlves')
        }
        return onEmit.apply(this, args)
    }
}

export { InjecHttpInterceptor }