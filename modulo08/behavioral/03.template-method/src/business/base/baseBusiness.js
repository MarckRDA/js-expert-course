import { NotImplementedException } from "../../util/exceptions";

export default class BaseBusiness {
    _validateRequireFields(data) {
        throw new NotImplementedException(
            this._validateRequireFields.name
        )     
    }
    
    _create(data) {
        throw new NotImplementedException(
            this._create.name
        )     
    }

    /*
        Padrão do Martin Fowler
        a proposta do padrão é garantir um fluxo de métodos, definindo uma sequencia a ser
        executada

        esse create abaixo é a implementação efetiva do Template Method
    */
    create(data) {
        const isValid = this._validateRequireFields(data)
        if(!isValid) throw new Error('invalid data!')

        return this._create(data)
    }
}