import React from 'react';
import style from './Allorders.module.css'; // Ensure this path is correct and the file exists
import Loading from '../Loading/Loading'; // Ensure this path is correct and the component exists
import useUserOrders from '../../Hooks/UseUserOrders';

export default function Allorders() {
  const { data, isLoading, error } = useUserOrders(); // Destructure error from useUserOrders

  // Log the state before rendering
  // console.log('Data:', data);
  // console.log('Is Loading:', isLoading);
  // console.log('Error:', error);


  return (
    <div className={style.ordersContainer}>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Loading />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
      ) : (
        <div  className="mb-24  ">
          <h1  className="text-3xl py-5  " >All Orders</h1>
          <div className="flex flex-wrap justify-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Order Id</th>
                    <th scope="col" className="px-6 py-3">Item Number</th>
                    <th scope="col" className="px-6 py-3">Delivering Address</th>
                    <th scope="col" className="px-6 py-3">Delivered</th>
                    <th scope="col" className="px-6 py-3">Paid</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        #{order.id}
                      </th>
                      <td className="px-6 py-4">{order.cartItems.length} Item(s)</td>
                      <td className="px-6 py-4">{order.shippingAddress.details} / {order.shippingAddress.city}</td>
                      <td className="px-6 py-4">{order.isDelivered ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4">{order.isPaid ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4">${order.totalOrderPrice.toFixed(2)}</td>
                      <td className="px-6 py-4">{order.shippingAddress.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}
