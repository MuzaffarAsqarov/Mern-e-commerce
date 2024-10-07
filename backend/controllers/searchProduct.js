const Product = require("../models/Product.model");
const ProductCategoryModel = require("../models/ProductCategory.model");

const searchProduct = async(req, res) => {     
    try {
        const query = req.query.q
        const regex = new RegExp(query,'i','g')

        if(query === '' || query === undefined){            
            return res.status(404).json({
                data: [],
                error: true,
                message: 'Product not founded'
            })
        }

        const products = await Product.find({productName : regex}).populate('category').limit(20)
        const productsPoCategory = await Product.find().populate({
            path: "category",
            match: {
                name: regex
            },            
        }).limit(20)

        const data = []

        if(products){
            for(let product of products){
                data.push(product)
            }
        }

        if(productsPoCategory){
            for(let product of productsPoCategory){
                if(product.category != null){
                    data.push(product)
                }
            }
        }
        
        res.status(200).json({
            data,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


const searchProductPoCategory = async(req, res) => {  
    try {
        const query = req.body.data
       console.log(query);
       
        // res.status(200).json({
        //     data,
        //     success: true
        // })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = {
    searchProduct,
    searchProductPoCategory
}