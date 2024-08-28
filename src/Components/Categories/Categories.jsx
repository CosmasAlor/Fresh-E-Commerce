import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import useCategories from '../../Hooks/useCategories';
import useSubCategories from '../../Hooks/useSubCategories';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Categories() {
  const { getCart } = useContext(CartContext);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch subcategories based on the selected category
  const { data: subCategories, isLoading: isSubCategoriesLoading } = useSubCategories(selectedCategoryId);

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (isCategoriesLoading || isSubCategoriesLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />
      </div>
    );
  }

  // Find the selected category to display its name
  const selectedCategory = categories?.find(cat => cat._id === selectedCategoryId);

  return (
    <>
    <h1 className="text-3xl py-5  ">All Categries</h1>
      <div className="flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8"  >
       
        {categories?.map((category) => (
          <div key={category._id} className="w-full sm:w-1/2  md:w-1/4 lg:w-1/5 mb-5">
            <div className="inner brand p-5 border-gray-200 border rounded h-64 sm:h-72 lg:h-80 overflow-hidden">
              <Link to="#" onClick={() => setSelectedCategoryId(category._id)}>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </Link>
            </div>
            <div className="title p-6 pt-0 text-center mt-3">
              <button className="w-full bg-main text-white rounded py-1 px-3 hover:bg-main-dark focus:outline-none focus:ring-4 focus:ring-main-dark" onClick={() => setSelectedCategoryId(category._id)}>
                {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl py-5 text-center">{selectedCategory?.name}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {subCategories?.map((subCategory) => (
              <div key={subCategory._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-5">
                <div className="inner brand  border-gray-200 border rounded overflow-hidden">
                  <h2 className="font-medium text-center  p-3">
                    {subCategory.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
