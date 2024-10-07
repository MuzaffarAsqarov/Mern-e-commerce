import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Configs } from '../../config/config';
import Swal from 'sweetalert2'
import moment from 'moment'

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';


export default function UserTable(props) {

    const navigate = useNavigate()
    const { token , userData } = useAuth()

    const { users, getUsers } = props
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`user-delete/${id}`, {
                        headers: {
                          "Authorization": `Bearer ${token}`
                        }
                      })
                    .then(res => {
                        if(res.status === 200){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                              getUsers()
                        }
                    }).catch( function (error){
                        if(error.status === 403){
                            navigate('login')
                        }
                    })            
                }
              });
        } catch (error) {
            toast.error(error)        
        }
        
    };


    return (
        <Paper sx={{ width: '100%' }}>            
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="right">Created date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Role</TableCell>
                            {userData?.role === 'admin' && 
                                <TableCell align="center">action</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                        <TableCell width={80}>
                                            <Avatar alt={user.name} src={`${Configs.BACKEND_URL}/images/${user.image}`} />
                                        </TableCell>
                                        <TableCell width={400}>{user.name}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="right">{moment(user.createdAt).format('ll')}</TableCell>
                                        <TableCell align="right">
                                            {user.status === 'active' ? 
                                                (<span className='text-green-600 rounded-full text-sm px-2  bg-green-100'>{user.status}</span>) :
                                                (<span className='text-red-600 rounded-full text-sm px-2 bg-red-100'>{user.status}</span>)
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {user?.role === 'admin' ? 
                                                (<span className='text-green-600 rounded-full text-sm px-2  bg-green-100'>{user?.role}</span>) :
                                                (<span className='text-orange-600 rounded-full text-sm px-2 bg-orange-100'>{user?.role}</span>)
                                            }
                                        </TableCell>
                                        {userData?.role === 'admin' && 
                                            <TableCell align="center" >
                                                <Link  to={`/admin/edit-user/${user._id}`} className='text-green-600 inline-block rounded-full text-xl p-2 hover:bg-green-100'>
                                                    <MdEdit/>
                                                </Link>
                                                <Link  className='text-red-600 inline-block rounded-full text-xl p-2 hover:bg-red-100' onClick={() => handleDelete(user._id)}>
                                                    <MdDelete/>
                                                </Link>
                                            </TableCell>
                                        }
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}



