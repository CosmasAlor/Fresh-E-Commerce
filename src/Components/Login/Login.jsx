import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Login() {

  const [apiError, setApiError] = useState(null)
  
  const [loading, setLoading] = useState(false)


 let {setUserData} =  useContext(UserContext);

  
  let navigate = useNavigate()
  
  
  async  function Register(values) {
    try {
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log(data);
      
      localStorage.setItem('userToken', data.token)
      
      navigate('/')
      setUserData(data.token);
      setLoading(false)
    } catch (error) {
      setApiError(error.response.data.message)
      setLoading(false)
    }
  
  
  
    console.log(values);
    
      
    }
  
  
  // function validateForm(values) {
  //   let errors = {}
  
  //   if (!values.name){
  //     errors.name = 'Name is required'
  //   }else if(!/^[A-Z][a-z]{2,10}$/.test(values.name)){
  //     errors.name = 'Name must start with capital letter ex(Cosmas)'
  //   }
  
  
  //   return errors
  // }
  
  
    let validationSchema = Yup.object().shape({

      email: Yup.string().email('Email invalid').required('Email is Required'),
      password: Yup.string().matches(/^[A-Z]\w{5,10}$/, 'invalid password ex(Ahmed123').required('password is Required'),

    })
  
    let formik = useFormik({
  
      initialValues: {

        email: '',
        password: '',

      },validationSchema,
      // validate: validateForm,
      onSubmit: Register
    })
  
    return <>
  
  
      <div className="w-1/2 mx-auto">
  
      <h1 className="text-3xl">Register</h1>
        <form onSubmit={formik.handleSubmit}>
          
        {apiError && <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}  
          </div>}
          


          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Your Email"  />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
          </div>
          
          {formik.errors.email && formik.touched.email && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}  
          </div>}
  
  
  
  
          
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Your Password"  />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
          </div>
  
  
          {formik.errors.password && formik.touched.password && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}  
          </div>}
          


  
  
          {formik.errors.phone && formik.touched.phone && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}  
          </div>}
  

  <div className="flex justify-between">
    <div className="mt-2">
      <Link to={'/ForgetPassword'} className="hover:text-green-500"> Forget Password ?</Link>
    </div>



{loading?<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>
    :  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  }
  </div>

         </form>
      </div>
  
  
    </>
  }

