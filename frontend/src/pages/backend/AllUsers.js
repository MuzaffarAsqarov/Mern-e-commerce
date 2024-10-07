import React, { useEffect, useState } from 'react'
import UserTable from '../../components/admin/userTable'
import axios from 'axios'
import Loading from '../../components/loading'
import { Breadcrumbs, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AllUsers = () => {

  const navigate = useNavigate()
  const { logout } = useAuth()

  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');

  const { userData } = useAuth()
  const { userToken } = JSON.parse(localStorage.getItem('user_data'))
 

  const getUsers = async () => {
      await axios.get('users', {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
        .then(res => {
          console.log(res.data)
          if (res.status === 200) {
            if (res.data.message === 'success') {
              setUsers(res.data.users)
              setLoading(false)
            }
          }
        })
        .catch(function (error) {
          if(error.status === 403){
            navigate('login')
            logout()
          }
          console.log('error', error)
        })             
  }

  useEffect(() => {
      getUsers() 
  },[])


  const handleChangeRole = (event) => {
    setRole(event.target.value);
};

const handleChangeStatus = (event) => {
    setStatus(event.target.value);
};


  return (
    <>
      {loading ? (<Loading/>) :
        (<div className='p-4'>
          <div className="p-4 flex justify-between items-end">
                <div className="">
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link underline="hover" color="inherit" href="/admin">
                    Admin
                  </Link>                  
                  <Typography sx={{ color: 'text.primary' }}>Users</Typography>
                </Breadcrumbs>
                    <h1 className="text-2xl font-bold mb-4">All users</h1>
                </div>
                <div className="">
                    <div className='flex'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80,  }}>
                            <InputLabel id="role">Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role"
                                value={role}
                                onChange={handleChangeRole}
                                label="Role"
                            >
                                <MenuItem value={10}>
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={20}>Admin</MenuItem>
                                <MenuItem value={30}>User</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80,  }}>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={status}
                                onChange={handleChangeStatus}
                                label="Status"
                            >
                                <MenuItem value={10}>
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={20}>Active</MenuItem>
                                <MenuItem value={30}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
          < UserTable users={users} getUsers={getUsers}  />
        </div>)
      }
    </>
  )
}

export default AllUsers