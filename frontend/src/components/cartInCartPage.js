import React from 'react'
import { Configs } from '../config/config';
import displayINRCurrency from '../helpers/displayCurrency';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const CartInCartPage = (props) => {

    const { product, getProducts } = props
    const userData = JSON.parse(localStorage.getItem('user_data')) 
    const { userToken } = userData

    const increment = async(id, qty) => {
        const count = {
            quantity: qty + 1
        } 
        await axios.put(`/update-card-product/${id}`, count, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }).then(res => {
            if(res.status === 204){
                getProducts()
            }
            
        }).catch(err => {
            console.log('card pagedagi cartalardan kelmoqda', err);
        })
    }

    const decrement = async(id, qty) => {
        if(qty >= 2){
            const count = {
                quantity: qty - 1
            } 
            await axios.put(`/update-card-product/${id}`, count, {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            }).then(res => {
                if(res.status === 204){
                    getProducts()
                }
                
            }).catch(err => {
                console.log('card pagedagi cartalardan kelmoqda', err);
            })
        }        
    }

    const handleDeleteClick = async(id) => {
        await axios.delete(`card-delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }).then(res => {
            if(res.status === 200){
                getProducts()
            }
        }).catch(err => {
            console.log(err);
            
        })
            
    }


  return (
    <div className='w-full'>
        <div className='w-[90%] flex border bg-white'>
            <div className='w-44 h-36 border bg-slate-200'>
                <img src={`${Configs.BACKEND_URL}/images/${product.productId.productImage[0]}`} className='w-full h-full object-scale-down'/>
            </div>
            <div className='p-4 w-full relative '>
                <div className='absolute top-1 rounded-full cursor-pointer right-1 p-2 text-red-500 hover:text-white hover:bg-red-500' onClick={() => handleDeleteClick(product?._id)}>
                    <MdDelete />
                </div>
                <h2 className='text-xl font-semibold'>{product.productId.productName}</h2>
                <p className='text-sm text-stone-500 capitalize'>{product.productId.category.name}</p>
                <p className='text-md mt-1 text-red-600 font-bold'>{displayINRCurrency(product.productId.price) }</p>
                <div className='flex gap-2 mt-2'>
                    <button 
                        className='border w-6 h-6 border-red-500 text-lg pb-1  rounded flex justify-center items-center text-red-500  bg-white hover:bg-red-500 hover:text-white'
                        onClick={() => decrement(product?._id, product?.quantity)}
                    >-</button>
                    <span className='font-semibold'>{product.quantity}</span>
                    <button 
                        className='border w-6 h-6 border-red-500 text-lg pb-1  rounded flex justify-center items-center text-red-500  bg-white hover:bg-red-500 hover:text-white'
                        onClick={() => increment(product?._id, product?.quantity)}
                    >+</button>
                </div>
                <h2 className='text-lg font-semibold absolute bottom-5 right-5'>
                    Total: {displayINRCurrency(product.productId.price * product?.quantity)}
                </h2>                
            </div>
        </div>        
    </div>
  )
}

export default CartInCartPage