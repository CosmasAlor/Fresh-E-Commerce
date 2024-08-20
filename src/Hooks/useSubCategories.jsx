import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useSubCategories(categoryId) {
  function getAllSubCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  }

  const response = useQuery({
    queryKey: ['getAllSubCategories', categoryId],
    queryFn: getAllSubCategories,
    enabled: !!categoryId, // Only fetch when categoryId is available
    select: (data) => data?.data.data,
  });

  return response;
}
