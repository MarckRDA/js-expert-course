import  { expect, describe, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('#Test suit for Tamplate Method desing pattern', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    
    describe('#OrderBusiness',() => {
        test('execute Order Business without Tamplate Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.00,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()
            // todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução
            // se algum squecer de chamar a função de validação, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequireFields(order)
            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()

        })
        test('execute Order Business with Tamplate Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.00,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequireFields.name
            )
            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )
            // com template method, a sequencia de passos é sempre executada
            // evita a replicação de lógica

            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledValidationFn).toHaveBeenCalled()
            expect(calledCreateFn).toHaveBeenCalled()
        })

    })
})