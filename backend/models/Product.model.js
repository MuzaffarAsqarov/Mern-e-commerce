const { Schema, model, mongoose } = require('mongoose')

const ProductSchema = new Schema({
    productName: String,
    brandName: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    productImage: [],
    description: String,
    price: Number,
    selling: Number,
    ownerId: mongoose.Schema.Types.ObjectId,
    
}, {timestamps: true})


module.exports = model('Product', ProductSchema)