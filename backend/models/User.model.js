const { Schema, model, mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Ism maydoni bo`sh bo`lishi mumkin emas!']
    },
    email: {
        type: String,
        required: [true, 'Email maydoni bo`sh bo`lishi mumkin emas!'],
        unique: [true, 'Bu emeil allaqachon mavjud!'],
        index: true,
    },
    password: {
        type: String,
        required: [true, '!Pasword bosh bolishi mumkin emas'],
        minlength: 6,
        maxlength: 255
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    phone: {
        type: String
    }
    
}, {timestamps: true})


UserSchema.statics.login = async  function(email, password){
    
        if(!email || !password){
            throw Error('All field must bo filled!')
        }
    
        const user = await this.findOne({email, status: 'active'})
        
        if(!user){
            throw Error('Incorrect email address!')
        }
       
        const match = await bcrypt.compare(password, user.password)
    
        if(!match){
            throw Error('Incorrect password!')
        }
        
        return user;   

}


module.exports = model('User', UserSchema)