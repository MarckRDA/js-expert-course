import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: 'abc123',
    amount: 200.00,
    products:[{ description: 'Shampoo' }]
})

const orderBusiness = new OrderBusiness()

console.info('order created', orderBusiness.create(order))