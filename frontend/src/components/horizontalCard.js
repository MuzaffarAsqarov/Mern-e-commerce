import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Configs } from '../config/config';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCard from '../helpers/addToCard';
import { useAuth } from '../context/AuthContext';
import { CountContext } from '../context/countContext';

const HorizontalCard = (props) => {
    const { product, loading } = props
    const { token } = useAuth()

    const { getCountInCart } = useContext(CountContext)

    const handleClick = (e, id) => {
        addToCard(e, id)
        getCountInCart(token)
    }
    
  return (
      <Link to={`/product-details/${product._id}`} className='bg-white w-72 h-32 flex overflow-hidden'>
          <div className='w-32 h-full  bg-stone-400 overflow-hidden'>
              <img src={`${Configs.BACKEND_URL}/images/${product.productImage[0]}`} className='w-full h-full object-scale-down transition-all hover:scale-110' />
          </div>
          <div className='p-3 flex flex-col '>
              <p className='text-md font-semibold uppercase line-clamp-2 text-wrap'>{product.productName}</p>
              <p className='text-sm font-semibold text-stone-500'>{product.category.name}</p>
              <p className='my-2 flex gap-4 '>
                  <span className='text-sm font-bold text-red-500'>{displayINRCurrency(product.price)}</span>
                  <span className='text-sm font-bold text-stone-500 line-through '>{displayINRCurrency(product.selling)}</span>
              </p>
              <button
                  className='w-full bg-red-500 px-3 rounded-full text-white text-sm mt-1'
                  onClick={(e) => handleClick(e, product._id)}
              >Add to card
              </button>
          </div>
      </Link>
  )
}

export default HorizontalCard