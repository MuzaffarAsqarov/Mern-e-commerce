const Product = require("../../models/Product.model")
const mongoose = require("mongoose");
const User = require('../../models/user.model')


const UploadProductController = async (req, res) => {
    try {
        const { productName, brandName, category, description, price, selling } = req.body
        const files = req.files.length > 0 && req.files

        const finalUrl = []
        if (!productName || !files || !category) {
            throw Error("Product name, paroduct category and product image requared!")
        } else {
            for (let file of files) {
                finalUrl.push(file.filename)
            }

            const newProduct = new Product({
                productName,
                brandName,
                category,
                description,
                price,
                selling,
                productImage: finalUrl,
            })
            await newProduct.save()
            res.status(200).json({
                message: 'success',
                newProduct
            })
        }


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all products
const GetProductsControlller = async (req, res) => {
    try {
        const allProduct = await Product.find().sort({createdAt: -1})
        if(!allProduct){
            throw new Error("Product not founded!")
        }

        res.status(200).json({
            message: 'success', 
            products: allProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

// get one product
const GetProductControlller = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id).populate('category')
        if(!product){
            throw Error("Product not founded!")
        }

        res.status(200).json({
            message: 'success',
            product: product
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

const EditProductController = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    try {
        
        const { productName, brandName, category, productImage, description, price, selling } = req.body
        const files = req.files.length > 0 && req.files

        const tokenId = req.user.userId
        const id  = req.params.id

        const finalUrl = []
        if (!productName || !category) {
            throw Error("Product name, paroduct category and product image requared!")
        } else {
            if(productImage.length > 0){
                let arr = productImage.split(','); 
                for (let image of arr) {
                    finalUrl.push(image)
                }
            }
            if(files){
                for (let file of files) {
                    finalUrl.push(file.filename)
                }
            }
            

            const editedProduct = await Product.findOneAndUpdate({ _id: id},{
                productName,
                brandName,
                category,
                description,
                price,
                selling,
                ownerId: tokenId,
                productImage: finalUrl,
            })
            await editedProduct.save()
            res.status(200).json({
                message: 'success',
                data: editedProduct
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


const GetPopularProductController = async (req, res) => {
    try {
        const categoryId = new mongoose.Types.ObjectId(req.params.categoryId)

        const allProduct = await Product.find({category: categoryId}).populate({
            path: 'category',
            select: 'name -_id',
        });

        if(!allProduct){
            throw Error("Product not founded!")
        }

        res.status(200).json({
            message: 'success',
            products: allProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}


const DeleteProduct = async (req, res) => {   
    
    try {
        const tokenId = req.user.userId
        const id  = req.params.id        

        const isAdmin = await User.findById(tokenId)
       
        if(isAdmin.role != 'admin' ){
            throw new Error('Deleting is for admin only!')
        }
        
        const product = await Product.findByIdAndDelete(id)
        
        if(!product){
            throw new Error('User not founded!')
        }
        
        res.status(200).json({
            message: "Category deleted",
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
}


// products po category
const GetProductsPoController = async (req, res) => {
    try {
        const { categoryId } = req.params
        const count = req.query.count        

        const products = await Product.find({category: categoryId}).populate('category').limit(count)

        if(!products){
            throw Error("Product not founded!")
        }

        res.status(200).json({
            message: 'success',
            products: products
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}



module.exports = {
    UploadProductController,
    GetProductsControlller,
    EditProductController,
    GetPopularProductController,
    DeleteProduct,
    GetProductControlller,
    GetProductsPoController
}