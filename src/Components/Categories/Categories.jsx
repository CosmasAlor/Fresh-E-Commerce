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

      <div className="flex flex-wrap justify-center mt-10">
        {categories?.map((category) => (
          <div key={category._id} className="w-1/3 mb-5">
            <div className="inner brand p-5 g-4 border-gray-200 border rounded m-5 h-96">
              <Link to="#" onClick={() => setSelectedCategoryId(category._id)}>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </Link>
            </div>
            <h2 className="font-medium text-center mt-3 p-5">
              {category.name.split(' ').slice(0, 2).join(' ')}
            </h2>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div>
          <h2 className="text-2xl py-5 text-center">{selectedCategory?.name}</h2>
          <div className="flex flex-wrap justify-center">
            {subCategories?.map((subCategory) => (
              <div key={subCategory._id} className="w-1/3 mb-5">
                <div className="inner brand g-4 border-gray-200 border rounded m-5">
                  <h2 className="font-medium text-center mt-3 p-5">
                    {subCategory.name.split(' ').slice(0, 2).join(' ')}
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
