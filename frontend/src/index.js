import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

axios.defaults.baseURL = "http://localhost:5000/api/";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>     
    <RouterProvider router={router}/>   
    <ToastContainer theme='colored' /> 
  </React.StrictMode>
);

