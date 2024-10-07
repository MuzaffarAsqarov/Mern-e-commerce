const { Schema, model, mongoose } = require('mongoose')

const AddToCartSchema = new Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
}, {timestamps: true})


module.exports = model('AddToCart', AddToCartSchema)