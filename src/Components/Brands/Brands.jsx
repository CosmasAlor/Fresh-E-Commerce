import React, { useContext, useEffect } from 'react';
import style from './Brands.module.css';
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
      <h1 className="text-3xl py-5 text-center">All Brands</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((brand) => (
          <div key={brand._id} className="w-1/4"> {/* Moved key prop to the outermost element */}
            <div className={`${style.inner} p-5 border-gray-200 border rounded m-3`}>
              <Link to={`/brand/${brand._id}`}> {/* Example path for each brand */}
                <img src={brand.image} alt={brand.name} className="w-full" />
                <h2 className="font-medium text-center">
                  {brand.name.split(' ').slice(0, 2).join(' ')}
                </h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
