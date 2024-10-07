import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VerticalCard from './verticalCard'

const ProductsPoCategory = (props) => {

    const { categoryId } = props    

    const [products, setProducts] = useState([])
    const [count, setCount] = useState(10)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get(`/products-po-category/${categoryId}`, {
            params: {
                count: count
            }
        }).then(res => {
                if(res.status === 200){
                    setProducts(res.data.products)
                    setLoading(false)
                }
            }
        ).catch( err => {
            console.log(err)
        })
    }, [categoryId, count]) 

    const handleShowMore = () => {
        setLoading(true)
        setCount(count + 10)
        // getProducts()
    }

  return (
      <div className='w-full'>
        <h1 className='text-2xl font-semibold py-5'>Products po Category</h1>
        <div className='w-full  grid grid-cols-5 place-items-center  gap-5'>
            {products && 
                products.map(product => {
                    return(
                        <VerticalCard  product={product} type={'vertical'}/>
                    )
                })
            }
        </div>
        {!loading ?
            <p className='text-center w-full text-blue-400 my-5 cursor-pointer hover:text-blue-500'  onClick={handleShowMore}>show more...</p> : 
            <p className='text-center w-full text-blue-400 my-5 cursor-pointer hover:text-blue-500'>loading...</p>
        }
        
        
          
      </div>
  )
}

export default ProductsPoCategory