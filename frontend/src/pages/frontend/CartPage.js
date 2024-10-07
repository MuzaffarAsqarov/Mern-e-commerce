import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartInCartPage from '../../components/cartInCartPage';
import displayINRCurrency from '../../helpers/displayCurrency';

const CartPage = () => {

    const navigate = useNavigate()

    const [notfounded, setNotFounded] = useState(false)
    const [products, setProducts] = useState([])
    const userData = JSON.parse(localStorage.getItem('user_data')) 
  
    const getProducts = async() => {
        const { userToken } = userData
        await axios.get('card-view', {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }).then(res => {
            console.log(res.data);    
            setProducts(res.data.products)
        }).catch(err => {
            if(err.status === 404 && err.response.data.error == true){
                setNotFounded(true)
            }
            console.log('err', err)            
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    const totalQty = products.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = products.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.price) ,0)

  return (
    <div className='container mx-auto  py-10'>
        {(notfounded === true) ?
           ( <div className='w-full flex justify-center items-center t-32'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold'>404</h1>
                    <p className='text-xl'>Product not founded!</p>
                </div>
            </div>) :
            (
                <div className='flex gap-4 w-full'>
                    <div className='w-[70%] flex flex-col gap-4'>
                        {products.map(product => {
                            return (
                                <CartInCartPage product={product} getProducts={getProducts}/>
                            )
                        })}
                    </div>
                    <div className='w-[30%] '>
                        <div className='w-full bg-red-500 text-white py-1 px-4'>
                            <h2 className='text-lg'>Summary</h2>
                        </div>
                        <div className='p-4 bg-white'>
                            <h2 className='flex  justify-between font-semibold'>Quantity: <span>{totalQty}</span></h2>
                            <h2 className='flex  justify-between font-semibold'>Total Price: <span>{displayINRCurrency(totalPrice) }</span></h2>
                        </div>
                        <button className='text-center text-sm text-white font-semibold p-2 w-full bg-blue-500'>Payment</button>
                    </div>
                </div>
            )
        }        
        
        
    </div>
  )
}

export default CartPage