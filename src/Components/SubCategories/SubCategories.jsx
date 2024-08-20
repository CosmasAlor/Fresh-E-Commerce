import React, { useContext, useEffect } from 'react';
import style from './SubCategories.module.css';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import useCategories from '../../Hooks/useCategories'; // Replace this with the actual hook for fetching data
import useSubCategories from '../../Hooks/useSubCategories';

export default function SubCategories() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context

  // Fetch categories data and loading state using a hook
  const { data, isLoading } = useSubCategories(); // Replace with the correct hook/function

  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, [getCart]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl py-5 text-center">Recent Products</h1>

      <div className="flex flex-wrap justify-center">
        {data.map((brand) => (
          <div key={brand._id} className="w-1/3 mb-5">
            <div className="inner brand g-4 border-gray-200 border rounded m-5 bg-red-200">
            <h2 className="font-medium text-center mt-3 p-5">
              {brand.name.split(' ').slice(0, 2).join(' ')}
            </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
