import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect, useState, useCallback } from 'react';
import { CartContext } from '../Context/CartContext';

export default function useUserOrders() {
    const { getCart } = useContext(CartContext);
    const [cartOwnerId, setCartOwnerId] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartOwner = await getCart(); // Await the async function and get cartOwner
                setCartOwnerId(cartOwner); // Set cartOwner ID in state
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart(); // Call the async function
    }, [getCart  ]);

    const fetchUserOrders = useCallback(async () => {
        if (!cartOwnerId) {
            console.log('Cart Owner ID is not available yet');
            return [];
        }

        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwnerId}`);
            console.log('API Response:', response.data); // Log the full API response
            return response.data || []; // Ensure it returns an array
        } catch (error) {
            console.error('Error fetching user orders:', error);
            return []; // Handle errors and return an empty array
        }
    }, [cartOwnerId]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['UserOrders', cartOwnerId], // Cache key for this query
        queryFn: fetchUserOrders,  // Function to fetch data
        enabled: !!cartOwnerId,    // Only run query when cartOwnerId is available
        retry: 5,                  // Retry once on failure
        staleTime: 5 * 60 * 1000   // Cache data for 5 minutes
    });

    return { data, isLoading, error }; // Return the result of the query
}
