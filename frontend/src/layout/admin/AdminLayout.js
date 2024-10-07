import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Outlet } from 'react-router-dom'
import { Configs } from '../../config/config';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";


const AdminLayout = () => {

  const { userData, isAuthenticated } = useAuth()

  const imege = (userData?.image != null) ? `${Configs.BACKEND_URL}/images/${userData?.image}` : "/";

  return (
      <div className='min-h-[calc(100vh-125px)]  flex '>
        <aside className='bg-white  h-screen max-h-[calc(100vh-100px)]  w-full max-w-60 shadow-md sticky top-16'>
          <div className='w-full  flex p-4'>
            <div className='w-16'>
              <Avatar alt={userData?.name} src={imege} sx={{ width: 56, height: 56 }} />
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-md font-bold'>{userData?.name}</h3>
              <p className='text-xs'>{userData?.email}</p>
            </div>
          </div>

          <div className='w-full '>
            <nav className='flex flex-col'>
              <Link to={"/admin"} className='px-3 py-2 hover:bg-slate-100 flex items-center'>
                  <MdDashboard className='mr-2' />
                  Dashboard
              </Link>
              <Link to={"all-users"} className='px-3 py-2 hover:bg-slate-100 flex items-center'>
                  <ImUsers className='mr-2'/>
                  All users
              </Link>
              <Link to={"product-category"} className='px-3 py-2 hover:bg-slate-100 flex items-center'>
                  <MdCategory className='mr-2'/>
                  Product category
              </Link>
              <Link to={"products"} className='px-3 py-2 hover:bg-slate-100 flex items-center'>
                  <FaShoppingCart className='mr-2'/>
                  Products
              </Link>
            </nav>
          </div>
        </aside>
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
  )
}

export default AdminLayout