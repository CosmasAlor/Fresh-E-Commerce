import React, { useContext, useState } from 'react';
import style from './Reset-Password.module.css';
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
    console.log(values);
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      
      localStorage.setItem('userToken', data.token)
      setUserData(data.token);
      console.log(data);
      navigate('/login');
    } catch (error) {
      setApiError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Email invalid').required('Email is required'),
    newPassword: Yup.string()
      .matches(/^[A-Z]\w{5,10}$/, 'Invalid password. Example: Ahmed123')
      .required('New password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="text-3xl">Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        {apiError && (
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Your Email"
          />
        </div>

        {formik.errors.email && formik.touched.email && (
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Your New Password"
          />
        </div>

        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="py-2 px-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.newPassword}
          </div>
        )}

        <div className="flex justify-between">
          {loading ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
