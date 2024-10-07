import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/frontend/HomePage";
import MasterLayout from "../layout/frontend/MasterLayout";
import AdminLayout from "../layout/admin/AdminLayout";
import ErrorPage from "../pages/errorPage";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/backend/Dashboard";
import AllUsers from "../pages/backend/AllUsers";
import Products from "../pages/backend/Products";
import EditUser from "../pages/backend/EditUser";
import ProductCategory from "../pages/backend/ProductCategory";
import ProductDetails from "../pages/frontend/ProductDetails";
import CartPage from "../pages/frontend/CartPage";
import SearchProduct from "../pages/frontend/searchProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MasterLayout/>,    
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "product-details/:id",
                element: <ProductDetails/>
            },
            {
                path: "card-page",
                element: <CartPage/>
            },
            {
                path: "/search",
                element: <SearchProduct/>
            },
            {
                path: "/admin",
                element: <ProtectedRoute/>,  
                children: [
                    {
                        path: '',
                        element: <AdminLayout/>,
                        children: [
                            {
                                index: true,
                                element: <Dashboard/>
                            },
                            {
                                path: 'all-users',
                                element: <AllUsers/>,
                            },
                            {
                                path: 'edit-user/:id',
                                element: <EditUser/>
                            },
                            {
                                path: 'product-category',
                                element: <ProductCategory/>
                            },
                            {
                                path: 'products',
                                element: <Products/>
                            }
                            
                        ]
                    }                    
                ]              
                                
            }
        ]   
    },
    
])


export default router;