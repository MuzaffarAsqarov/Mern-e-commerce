import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useContext } from 'react'

const addToCard = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()
    
    const userData = JSON.parse(localStorage.getItem('user_data')) 
    const getToken = (userData) => {
        const { userToken } = userData
        return userToken
    }

    
    try {
        const userToken = userData != null ? getToken(userData) : ''

        await axios({ method: 'post', url:`addtocart/${id}`, headers: { 'Authorization': 'Bearer ' + userToken }}).then(res => {
            if(res.status === 200){
                if(res.data.success){
                    toast.success(res.data.message, {
                        position: "top-center",
                    })
                }
            }
        }).catch(err => {
            if(err.status === 403 && err?.response?.data?.isExist == true){
                toast.error(err.response.data.message, {
                    position: "top-center",
                  });
            }
            if(err.status === 401){
                toast.warning("User Unauthorized!")
            } 
            if(err.status === 403 && err?.response?.data?.auth == false){
                toast.warning("User Unauthorized!")   
                localStorage.removeItem('user_data')             
            } 
            console.log( "add to cart function", err)      
        })  
    } catch (error) {
        console.log( "add to cart function", error)
    }      

}

export default addToCard