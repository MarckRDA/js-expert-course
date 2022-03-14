const UserRepository = require("../repository/userRepository");
const UserServices = require("../service/userServices");
const Database = require("../util/database");

class UserFactory {
    static async createInstance() {
        const db = new Database({ connectionString: 'mongodb://localhost' })
        const dbConnection = await db.connect()
        const userRepository = new UserRepository({ dbConnection })
        const userService = new UserServices({ userRepository })

        return userService
    }
}

module.exports = UserFactory