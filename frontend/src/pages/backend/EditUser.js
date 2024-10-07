import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import { Avatar, Breadcrumbs, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

const EditUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
   
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = React.useState('');
  const [role, setRole] = React.useState('');

  const user_data = JSON.parse(localStorage.getItem('user_data')) 

  const getUser =  async () => {
    await axios.get(`get-user/${id}`, {
      headers: {
        "Authorization": `Bearer ${user_data?.userToken}`
      }
    }).then(res => {
      if(res.status === 200){
        setUser(res.data.user)
        setStatus(res.data.user.status === 'active' ? 10 : 20)
        setRole(res.data.user.role === 'admin' ? 10 : 20)
      }
      console.log('user', user)
    }).catch( function (error) {
      console.log('error', error)
      setErrors(error.response.data)
      if(error.status === 403){
        navigate('login')
        logout()
      }
    })
  } 

  useEffect(() => {
    getUser()
  }, [])


  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

 const handleSubmitClick = async () => {
    const data = {
      status: status === 10 ? 'active' : 'inactive',
      role: role === 10 ? 'admin' : 'user',
    }

    await axios.put(`edit-user/${id}`, data, {
      headers: {
        "Authorization": `Bearer ${user_data?.userToken}`
      }
    }).then(res => {
      if(res.status === 200){
        navigate('/admin/all-users')
      }
    }).catch( function (error) {
      toast.error(error.message)
    })
  };


  return (
    <>
      {loading ? (<Loading />) :
        <div className='p-4'>
          <div className='p-4'>
            <Breadcrumbs aria-label="breadcrumb" >
              <Link underline="hover" color="inherit" href="/admin">
                Admin
              </Link>
              <Typography sx={{ color: 'text.primary' }}>User</Typography>
            </Breadcrumbs>
            <h1 className="text-2xl font-bold mb-4">Edit user</h1>
          </div>
          <div className='bg-white w-1/3  p-6' >
            <div className='flex flex-col gap-4'>
              <Avatar
                alt={user.name}
                src={user?.image && user?.image}
                sx={{ width: 70, height: 70 }}
              />
              <TextField id="standard-basic" label="Name" variant="standard" inputProps={{ readOnly: true }} value={user.name} />

              <TextField id="standard-basic" label="Email" variant="standard" inputProps={{ readOnly: true }} value={user.email} />

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="status">status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  value={status}
                  onChange={handleChangeStatus}
                  label="Status"
                >
                  <MenuItem value={10}>active</MenuItem>
                  <MenuItem value={20}>inactive</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="role">role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={role}
                  onChange={handleChangeRole}
                  label="Role"
                >
                  <MenuItem value={10}>admin</MenuItem>
                  <MenuItem value={20}>user</MenuItem>
                </Select>
              </FormControl>

              <button 
                className='bg-red-500 hover:bg-red-400 p-2 rounded text-white font-semibold'
                onClick={handleSubmitClick}
              >Update
              </button>

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EditUser