import React, { useContext, useState } from 'react'
import style from './ForgetPassword.module.css'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

  export default function ForgetPassword() {

    const [apiError, setApiError] = useState(null)
    
    const [loading, setLoading] = useState(false)
  
  
   let {setUserData} =  useContext(UserContext);
  
    
    let navigate = useNavigate()
    
    
    async  function Register(values) {
      try {
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
        console.log(data);
        
        // localStorage.setItem('userToken', data.token)
        
        navigate('/verify-code')
        setUserData(data.token);
        setLoading(false)
        console.log(data);
        

      } catch (error) {
        setApiError(error.response.data.message)
        setLoading(false)
      }
    
      }
  
      let validationSchema = Yup.object().shape({
  
        email: Yup.string().email('Email invalid').required('Email is Required'),
      
      })
    
      let formik = useFormik({
    
        initialValues: {
  
          email: '',

  
        },validationSchema,
        // validate: validateForm,
        onSubmit: Register
      })
    
      return <>
       

    
        {/* <h1 className="text-3xl">Register</h1>
          <form onSubmit={formik.handleSubmit}>
            
          {apiError && <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}  
            </div>}
            

            <div className="relative z-0 w-full mb-5 group">
              <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Your Email"  />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
            </div>
            
            {formik.errors.email && formik.touched.email && 
            <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}  
            </div>}

  
  {loading?<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className='fas fa-spinner fa-spin-pulse'></i></button>
      :  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    }

  
           </form> */}

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto m-14 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
            {apiError && <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {apiError}  
            </div>}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your email</label>
                <input 
                name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} 
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {formik.errors.email && formik.touched.email && 
            <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}  
            </div>}


    {loading?               <button
                type="submit"
                className="w-full bg-main text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <i className='fas fa-spinner fa-spin-pulse'></i>
              </button>
    
      :                <button
      type="submit"
      className="w-full bg-main text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Submit
    </button>
    }



              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account yet? 
                <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      </>
    }
