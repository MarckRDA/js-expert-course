import Util from "../util.js"
import replaceAll from 'replaceall'

const componentNameAnchor = '$$componentName'
const currentContextAnchor = '$$currentContext'
const repositoryAnchor = '$$repositoryName'

const template = `
export default class $$componentNameService {
    constructor({ repository: $$repositoryName }) {
        $$currentContext = $$repositoryName
    }

    create(data) {
        return $$currentContext.create(data)
    }

    read(query) {
        return $$currentContext.read(query)
    }

    update(id, data) {
        return $$currentContext.update(id, data)
    }

    delete(id) {
        return $$currentContext.delete(id)
    }
}`

export function serviceTemplate(componentName, repositoryName) {
    const currentContext = `this.${repositoryName}`
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName), template)
        .replaceAll(currentContextAnchor, currentContext, template)
        .replaceAll(repositoryAnchor, repositoryName, template)

    return {
        fileName: `${componentName}Service`,
        template: txtFile 
    }
}