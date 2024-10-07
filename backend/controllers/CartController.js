const AddToCart = require("../models/addToCart.model")
const mongoose = require("mongoose");

const AddToCartController = async (req, res) => {   
    
    try {        
        const productId  = new mongoose.Types.ObjectId(req.params.productId)
        
        const currentUser = req.user

        const isProductAvailable = await AddToCart.find({productId: productId})

        if(isProductAvailable.length > 0){            
            return res.status(403).json({
                message: 'All ready in add to card',
                isExist: true
            })
            
        }
 
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser.userId
        }
       
        const newProductInCard = await AddToCart(payload)
        const saveNewProduct = await newProductInCard.save()

        res.status(200).json({
            data: saveNewProduct,
            message: "Product Added.",
            success: true
        })
        
    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
}


const DeleteCardController = async(req, res) => {
    try {
        const productId = req.params.id

        const product = await AddToCart.findByIdAndDelete(productId)

        if(!product){
            throw new Error('product not founded!')
        }

        res.status(200).json({
            message: "Product deleted in category",
        })
        
    } catch (error) {
        
    }
}

module.exports = {
    AddToCartController,
    DeleteCardController
}