import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VerticalCard from '../../components/verticalCard'

const SearchProduct = () => {

    const query = useLocation()
    const [data, setData] = useState([])
    const [notfounded, setNotfounded] = useState('')
    const [loading, setloading] = useState(false)      

    const fetchProduct = async() => {
        setloading(true)
        await axios.get(`search/${query.search}`)
        .then(res => {
            if(res.status === 200){
                setData(res.data.data)
            }          
        }).catch(err => {
            if(err.status === 404){
                setNotfounded('Product not founded')
            }
            console.log(err);            
        })
        setloading(false)        
    }
   

    useEffect(() => {
        fetchProduct()
    }, [query])

  return (
    <div className='container mx-auto py-5 relative'>
        <div className='w-full flex justify-normal gap-5 '>
            <div className='w-full'>
                {loading ? 

                    <h1>Loding...</h1> :

                    <div className='w-full'>
                        <h1 className='mb-5'>Search results: <span className='font-bold '>{data.length}</span></h1>
                        {data.length > 0 ? 
                            <div className='w-full grid grid-cols-6 justify-center gap-4'>
                                {data.map(product => {
                                        return (
                                            <VerticalCard product={product}/>
                                        )
                                    })                
                                } 
                            </div> :
                            <div className='text-3xl text-center capitalize font-bold text-stone-500 mt-10'>{notfounded}</div>
                        }  
                    </div>
                }
            </div>

        </div>
    </div>
  )
}

export default SearchProduct