const AddToCart = require("../models/addToCart.model")

const CartViewController = async(req, res) => {      
    
    try {
        const userId = req.user.userId


        const products = await AddToCart.find({ userId: userId }).populate({
            path: 'productId',
            populate: {
                path: 'category',
                model: 'ProductCategory' 
            }
        })

        

        if(products.length == 0){
            return res.status(404).json({
                error: true,
                message: 'Product not founded!'
            })
        }
        res.status(200).json({
            message : 'success',
            products: products
        })

    } catch (error) {
        res.json(error)
    }
}

module.exports = CartViewController