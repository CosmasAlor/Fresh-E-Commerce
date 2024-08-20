import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useCategories() {


    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      }

    
      const response = useQuery({
        queryKey: ['getAllCategories'],
        queryFn: getCategories,
        // gcTime: 3000
        select:(data)=> data?.data.data
      });



      
  return response
}
