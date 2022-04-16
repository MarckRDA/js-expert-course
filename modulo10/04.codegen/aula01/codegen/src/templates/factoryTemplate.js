import Util from "../util.js"
import replaceAll from 'replaceall'

const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepAnchor = '$$repositoryNameDep'

const componentNameAnchor = '$$componentName'

const template = `
import $$serviceName from '../service/$$serviceNameDep.js'
import $$repositoryName from '../service/$$repositoryNameDep.js'

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName()
        const service = new $$serviceName({ repository })
        return service
    }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName), template)

        .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName), template)
        .replaceAll(repositoryNameDepAnchor, Util.lowerCaseFirstLetter(repositoryName), template)

        .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName), template)
        .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName), template)
       

    return {
        fileName: `${componentName}Factory`,
        template: txtFile 
    }
}