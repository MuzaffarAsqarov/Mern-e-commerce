import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CountContext = createContext(null)


export const CountCardProvider = ({ children }) => {

    const user_data = JSON.parse(localStorage.getItem('user_data'))

    const [countInCart, setCountInCart] = useState(0)

    const getCountInCart = async(token) => {
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
            const { userToken } = user_data;
            getCountInCart(userToken)                
        }
    }, []) 


    return  <CountContext.Provider value={{getCountInCart, countInCart}}>
                { children }
            </CountContext.Provider>
}