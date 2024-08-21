import React, { useContext, useState } from 'react';
import style from './Verify-Code.module.css';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

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
    <div className="w-1/2 mx-auto">
      <h1 className="text-3xl">Verify Code</h1>
      <form onSubmit={formik.handleSubmit}>
        {apiError && (
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="resetCode"
            id="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter the reset code"
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.resetCode}
            </div>
          )}
        </div>

        {loading ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled
          >
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
