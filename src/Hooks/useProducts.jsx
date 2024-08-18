import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {


    function getRecentProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
    
      const response = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        // gcTime: 3000
        select:(data)=> data?.data.data
      });

  return response
}
