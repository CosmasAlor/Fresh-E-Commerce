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
  


    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-14">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {apiError && <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}  
          </div>}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {formik.errors.email && formik.touched.email && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}  
          </div>}

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>




  
              {formik.errors.password && formik.touched.password && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}  
          </div>}



              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <Link to={'/ForgetPassword'} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"> Forgot password? </Link>
              </div>



              {loading?
               <button
               type="submit"
               className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
             >
               <i className='fas fa-spinner fa-spin-pulse'></i>
             </button>
              
              
             
    :   <button
    type="submit"
    className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    Sign in
  </button>
  }
  
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? 
                <Link to={'/Register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up </Link>
              </p>

          </div>
        </div>
      </div>
      </form>


  
    </>
  }

