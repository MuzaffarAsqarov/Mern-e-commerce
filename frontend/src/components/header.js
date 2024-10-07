import React, { useContext } from 'react'
import Logo from './logo'
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AccountMenu from './admin/accountMenu';
import { useAuth } from '../context/AuthContext';
import { CountContext } from '../context/countContext';

const Header = () => {

    const navigate = useNavigate()

    const { isAuthenticated  } = useAuth()  
    const { countInCart } = useContext(CountContext)  

    const handleChange = (e) => {
        const { value } = e.target

        if(value){
            navigate(`search?q=${value}`)
        }else{
            navigate(`search`)
        }
    }

    const handleSearchClick = () => {
        
    }
    
    return (
        <header className='h-16 shadow-md sticky top-0 bg-white z-40'>
            <div className="h-full flex items-center justify-between  mx-auto px-4">
                <div className='h'>
                    <Link to={"/"}>
                        <Logo w={100} h={50} />
                    </Link>
                </div>

                <div className='hidden md:flex items-center w-full max-w-sm border rounded-full focus-within:shadow-md'>  
                    <input type="text" placeholder="search product here..." className='w-full outline-none pl-3' onChange={(e) => handleChange(e)} /> 
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center cursor-pointer justify-center rounded-r-full text-white' onClick={handleSearchClick}>
                        <GrSearch />                  
                    </div>                 
                </div>

                <div className='flex items-center gap-5'> 
                    {isAuthenticated && 
                        <Link to={'card-page'} className='text-2xl relative'>
                            <span> <FaShoppingCart /></span>
                            <div className='bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full p-1 absolute -top-2 -right-3'>
                                <p className='text-xs'>{countInCart}</p>
                            </div>                       
                        </Link> 
                    }

                    {isAuthenticated ? <AccountMenu/> :
                        <div>
                            <Link to={"/login"} className='bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700'>Login</Link>
                        </div> 
                    }
                </div>

            </div>

        </header>
    )
}

export default Header