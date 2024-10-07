const addToCart = require("../models/addToCart.model")

const UpdatedToCardController = async (req, res) => {
    try {
        const userId = req.user.userId
        const productId = req.params.id
        const qty = req.body.quantity

        const updatedProduct = await addToCart.updateOne({_id: productId},{
            ...(qty && {quantity : qty})
        })

        res.status(204).json({
            message: 'Product Updated',
            products: updatedProduct,
            success: true
        })
    } catch (error) {
        res.json(error)
    }
}

module.exports = UpdatedToCardController