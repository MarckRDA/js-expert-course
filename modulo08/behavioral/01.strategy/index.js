import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgressStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectString = 'postgres://marcos:senha007@localhost:5432/heroes'
const mongoDBConnectionString = 'mongodb://marcos:admin@localhost:27017/heroes'
const postgresContext = new ContextStrategy(new PostgressStrategy(postgresConnectString))
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await postgresContext.connect()
await mongoDBContext.connect()

const data = [{
    name: 'marcos',
    type: 'transaction'
}, {
    name: 'Maria',
    type: 'activityLog'
}]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const { type, name } of data) {
    const context = contextTypes[type]
    await context.create({ name: name + Date.now() })
    
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())
}