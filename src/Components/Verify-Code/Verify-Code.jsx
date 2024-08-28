import React, { useContext, useState } from 'react';
import style from './Verify-Code.module.css';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  let { setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      setLoading(true);
  
      // Ensure resetCode is a string
      const formattedValues = {
        ...values,
        resetCode: values.resetCode.toString(),
      };
  
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formattedValues);
      
      navigate('/Reset-Password');
      setUserData(data.token);
      setLoading(false);
    } catch (error) {
      setApiError(error.response?.data?.message || 'An unexpected error occurred');
      setLoading(false);
    }
  }
  

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required('Reset code is required')
      .length(6, 'Reset code must be exactly 6 digits'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (

    // <div className="w-1/2 mx-auto">
    //   <h1 className="text-3xl">Verify Code</h1>
    //   <form onSubmit={formik.handleSubmit}>
    //     {apiError && (
    //       <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    //         {apiError}
    //       </div>
    //     )}

    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="number"
    //         name="resetCode"
    //         id="resetCode"
    //         value={formik.values.resetCode}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //         className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder="Enter the reset code"
    //       />
    //       {formik.errors.resetCode && formik.touched.resetCode && (
    //         <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    //           {formik.errors.resetCode}
    //         </div>
    //       )}
    //     </div>

    //     {loading ? (
    //       <button
    //         type="button"
    //         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //         disabled
    //       >
    //         <i className="fas fa-spinner fa-spin-pulse"></i>
    //       </button>
    //     ) : (
    //       <button
    //         type="submit"
    //         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Submit
    //       </button>
    //     )}
    //   </form>
    // </div>

<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto m-14 lg:py-0">
<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Verification Code
    </h1>
    <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
    {apiError && <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}  
    </div>}
      <div>
        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the Code Send to your email</label>
        <input 
        
        type="number"
        name="resetCode"
        id="resetCode"
        value={formik.values.resetCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        
      
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter the 6 digits "
          required
        />
      </div>
      {formik.errors.email && formik.touched.email && 
    <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}  
    </div>}


  {loading?  <button

      type="submit"
        className="w-full bg-main text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <i className='fas fa-spinner fa-spin-pulse'></i>
      </button>

:  <button
type="submit"
className="w-full bg-main text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
>
Submit
</button>
}



    </form>
  </div>
</div>
</div>
  );
}
