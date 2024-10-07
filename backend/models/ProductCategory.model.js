const { Schema, model, mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ProductCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Ism maydoni bo`sh bo`lishi mumkin emas!'],
        unique: [true, 'Bu nmdan allaqachon foydalanilgan!'],
        index: true,
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
    }
    
}, {timestamps: true})




module.exports = model('ProductCategory', ProductCategorySchema)