const { Router } = require('express')
const router = Router()
const { upload } = require('../helpers/filehelper')

const { CreateUser, UserLogin } = require('../controllers/AuthController')
const { authToken } = require('../middlewares/authToken')
const { GetMeInfo, GetUsers, GetUser, EditUser, DeleteUser } = require('../controllers/UserController')
const { 
        UploadProductController, 
        GetProductControlller, 
        EditProductController, 
        GetPopularProductController, 
        DeleteProduct, 
        GetProductsControlller, 
        GetProductsPoController 
    } = require('../controllers/product/ProductController')
const { CreateProductCategory, GetProductCategory, EditProductCategory, DeleteProductCategory, GetProductCategoryActive } = require('../controllers/ProductCategoryController')
const { AddToCartController, DeleteCardController } = require('../controllers/CartController')
const CountProductInCart = require('../controllers/CountProductInCart')
const CartViewController = require('../controllers/CartViewController')
const UpdatedToCardController = require('../controllers/updateAddToCardProduct')
const { searchProductPoCategory, searchProduct } = require('../controllers/searchProduct')

router.post('/register', upload.single('image'),  CreateUser)
router.post('/login',  UserLogin)
router.get('/search',  searchProduct)
router.get('/search-po-category',  searchProductPoCategory)

router.get('/me', authToken, GetMeInfo)
router.get('/users', authToken, GetUsers)
router.get('/get-user/:id', authToken, GetUser)
router.put('/edit-user/:id', authToken, EditUser)
router.delete('/user-delete/:id', authToken, DeleteUser)

router.post('/product', authToken, upload.array('image'), UploadProductController)
router.get('/products',  authToken,  GetProductsControlller)
router.put('/product/:id', authToken, upload.array('image'), EditProductController)
router.delete('/product/:id', authToken, DeleteProduct)

router.get('/product-category', authToken,  GetProductCategory)
router.post('/product-category', authToken, upload.single('image'), CreateProductCategory)
router.put('/product-category/:id', authToken, upload.single('image'), EditProductCategory)
router.delete('/product-category/:id', authToken,  DeleteProductCategory)


router.get('/product-category/:categoryId',  GetPopularProductController)
router.get('/categories', GetProductCategoryActive)
router.get('/product/:id',  GetProductControlller)
router.get('/products-po-category/:categoryId',  GetProductsPoController)



// user add to cart
router.post('/addtocart/:productId', authToken, AddToCartController)
router.get('/count-product-in-cart', authToken, CountProductInCart)
router.get('/card-view', authToken, CartViewController)
router.put('/update-card-product/:id', authToken, UpdatedToCardController)
router.delete('/card-delete/:id', authToken, DeleteCardController)



module.exports = router