import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import useBrands from '../../Hooks/useBrands';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Brands() {
  const { getCart } = useContext(CartContext); // Accessing getCart from the context
  const { data, isLoading } = useBrands();

  useEffect(() => {
    getCart(); // Call getCart when the component mounts
  }, [getCart]); // Added getCart to the dependency array

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
<div className='p-4 mb-10'>
<h1 className="text-3xl py-5  ">All Brands</h1>
      <div className="flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
        {data.map((brand) => (
          <div key={brand._id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2">
            <div className="p-5 border border-gray-200 rounded bg-white">
              <img src={brand.image} alt={brand.name} className="w-full h-auto object-cover rounded" />
              <h2 className="font-medium text-center mt-2">
                {brand.name.split(' ').slice(0, 2).join(' ')}
              </h2>
            </div>
          </div>
        ))}
      </div>
</div>
    </>
  );
}
