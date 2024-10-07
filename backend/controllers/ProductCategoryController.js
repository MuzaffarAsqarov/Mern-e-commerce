const ProductCategory = require('../models/ProductCategory.model')
const User = require('../models/user.model')

const fs = require('fs')

const CreateProductCategory = async (req, res) => {  
    try {        
        const { name, status } = req.body

        if(!req.file || !name){
            throw new Error('Caregory image and Category name not posible empty!')
        }else{            
            const newCategory = new ProductCategory({
                name,
                status : status == 'true' ? 'active' : 'inactive',
                image: req.file.filename
            })
            const category = await newCategory.save()
            
            res.status(200).json({
                message:  'succes',
                category
            })
        }
      
    } catch (error) {   
        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(403).json({
                error: 'email must be unique'
            })
        } else {
            res.status(403).json({
                error: error.message
            })
        }
        const path = './public/images/' + req.file.filename
        fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
            }
        })
    }
}

const GetProductCategory = async (req, res) => {
    try {
        
        const categories = await ProductCategory.find().populate()
        
        if(!categories){
            throw new Error("Categorya topilmadi")
        }else{            
            res.status(200).json({
                message: 'success',
                categories
            })
        }
        
    } catch (error) {
        res.status(403).json({
            error: 'email must be unique'
        })
    }
}

const GetProductCategoryActive = async (req, res) => { 
    try {
        
        const categories = await ProductCategory.find({status: 'active'}).populate()
        
        if(!categories){
            throw new Error("Categorya topilmadi")
        }else{            
            res.status(200).json({
                message: 'success',
                categories
            })
        }
        
    } catch (error) {
        res.status(403).json({
            error: 'email must be unique'
        })
    }
}

const EditProductCategory = async (req, res) => {
    try {
        const id  = req.params.id
        const { name, status, image } = req.body

        const category = await ProductCategory.findById(id)
        console.log(category);
        
        category.name = name,
        category.status = status === 'true' ? 'active' : 'inactive'
         if(!req.file){
            category.image = image
        }
        if(req.file){
            category.image = req.file.filename
        }
        const editedCategord = await category.save()

        res.status(200).json({
            message: 'success',
            category: editedCategord
        })
        
    } catch (error) {
        res.status(403).json(error)
    }
}

const DeleteProductCategory = async (req, res) => {
    console.log('salom');
    
    try {
        const tokenId = req.user.userId
        const id  = req.params.id

        const isAdmin = await User.findById(tokenId)
        if(isAdmin.role != 'admin' ){
            throw new Error('Deleting is for admin only!')
        }

        const category = await ProductCategory.findByIdAndDelete(id)
        
        if(!category){
            throw Error('User not founded!')
        }
        
        res.status(200).json({
            message: "Category deleted",
        })
        
    } catch (error) {
        res.status(403).json(error)
    }
}



module.exports = {
    CreateProductCategory,
    GetProductCategory,
    EditProductCategory,
    DeleteProductCategory,
    GetProductCategoryActive
}