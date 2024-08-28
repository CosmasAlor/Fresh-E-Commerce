import React, { useContext, useEffect, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'


import { CartContext } from '../../Context/CartContext'


export default function Checkout() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, [getCart]); // Added getCart to the dependency array



  
  let {checkout} = useContext(CartContext)

    let formik = useFormik({
  
      initialValues: {

        details: '',
        city: '',
        phone: '',

      },
      // validate: validateForm,
      onSubmit: checkout
    })
  
    return <>
  
  
  
      <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-14">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Shipping Details
            </h1>



              <div>
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
                <input
                  type="text"
                  name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Miser El Gadida"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your City</label>
                <input
                
                  type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cairo"
                  required
                />
              </div>



              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone Number</label>
                <input type="tel"  name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="01234567891"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
  
 {/* <button
    type="submit"
    className="w-full text-white bg-main hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    Submit
  </button> */}
  
  
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

          </div>
        </div>
      </div>
      </form>
    </>
  }