import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  async function handleResetPassword(values) {
    console.log('Submitting values:', values); // Ensure this matches {email: '', newPassword: ''}
    try {
      setLoading(true);
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      
      localStorage.setItem('userToken', data.token);
      setUserData(data.token);
   
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setApiError(errorMessage);
      console.error('API Error:', error.response?.data); // Log detailed error response
    
    } 
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    newPassword: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, 'Invalid password. Example: Ahmed123')
      .required('New password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',        // Must be 'email'
      newPassword: '',  // Must be 'newPassword'
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    // <div className="w-1/2 mx-auto">
    //   <h1 className="text-3xl">Reset Password</h1>
    //   <form onSubmit={formik.handleSubmit}>
    //     {apiError && (
    //       <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    //         {apiError}
    //       </div>
    //     )}

    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder="Your Email"
    //       />
    //     </div>

    //     {formik.errors.email && formik.touched.email && (
    //       <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    //         {formik.errors.email}
    //       </div>
    //     )}

    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="password"
    //         name="newPassword"
    //         id="newPassword"
    //         value={formik.values.newPassword}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder="Your New Password"
    //       />
    //     </div>

    //     {formik.errors.newPassword && formik.touched.newPassword && (
    //       <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    //         {formik.errors.newPassword}
    //       </div>
    //     )}

    //     <div className="flex justify-between">
    //       {loading ? (
    //         <button
    //           type="button"
    //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //         >
    //           <i className="fas fa-spinner fa-spin-pulse"></i>
    //         </button>
    //       ) : (
    //         <button
    //           type="submit"
    //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //         >
    //           Reset Password
    //         </button>
    //       )}
    //     </div>
    //   </form>
    // </div>


    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto  lg:py-14">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Your Password
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
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
                <input type="password" name="newPassword" id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>




  
              {formik.errors.newPassword && formik.touched.newPassword && 
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.newPassword}  
          </div>}






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



  );
}
