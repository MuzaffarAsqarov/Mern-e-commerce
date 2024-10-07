import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const user_data = JSON.parse(localStorage.getItem('user_data'))    
    
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [countInCart, setCountInCart] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const getCountInCart = async() => {
        axios.get('count-product-in-cart', {
            headers: { 
                'Authorization': 'Bearer ' + token 
            }
        }).then(res => {
            if(res.status === 200 && res.data.message === "ok"){
                setCountInCart(res.data.data.count)
            }
            
        }).catch(err => {            
            console.log('count err',err)
        }) 
    }
    
    useEffect(() => {   
        if(user_data){
            const { userToken, user } = user_data;
            setToken(userToken)
            setUserData(user)
            setIsAuthenticated(true)  
            getCountInCart()                
        }
    }, []) 

    const login = (current_user) => {
        const { userToken, user  } = current_user 
        localStorage.setItem(
            'user_data', JSON.stringify({userToken: userToken, user: user})
        );
        setToken(userToken)
        setUserData(user)
        setIsAuthenticated(true)
    }; 

    const logout = () => {
        localStorage.removeItem('user_data')
        setToken(null)
        setUserData(null)
        setIsAuthenticated(false)
    }

    return  <AuthContext.Provider value={{token, userData, isAuthenticated, countInCart, login, logout,   getCountInCart}}>
                { children }
            </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)