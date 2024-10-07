const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/shop',{
            autoIndex: true,
        })
        console.log(`MongoDb connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB