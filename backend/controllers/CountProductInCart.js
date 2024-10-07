const AddToCart = require("../models/addToCart.model")

const CountProductInCart = async (req, res) => {
    try {
        const userId = req.user.userId

        const count = await AddToCart.countDocuments({userId : userId})

        res.status(200).json({
            data: {
                count: count
            },
            message: 'ok',
            success: true
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = CountProductInCart