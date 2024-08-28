// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { useContext, useEffect, useState, useCallback } from 'react';
// import { CartContext } from '../Context/CartContext';

// export default function useUserOrders() {
//     const { getCart } = useContext(CartContext);
//     const [cartOwnerId, setCartOwnerId] = useState(null);

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const cartOwner = await getCart(); // Await the async function and get cartOwner
//                 setCartOwnerId(cartOwner); // Set cartOwner ID in state
//             } catch (error) {
//                 console.error('Error fetching cart:', error);
//             }
//         };

//         fetchCart(); // Call the async function
//     }, [getCart  ]);

//     const fetchUserOrders = useCallback(async () => {
//         if (!cartOwnerId) {
//             console.log('Cart Owner ID is not available yet');
//             return [];
//         }

//         try {
//             const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwnerId}`);
//             console.log('API Response:', response.data); // Log the full API response
//             return response.data || []; // Ensure it returns an array
//         } catch (error) {
//             console.error('Error fetching user orders:', error);
//             return []; // Handle errors and return an empty array
//         }
//     }, [cartOwnerId]);

//     const { data, isLoading, error } = useQuery({
//         queryKey: ['UserOrders', cartOwnerId], // Cache key for this query
//         queryFn: fetchUserOrders,  // Function to fetch data
//         enabled: !!cartOwnerId,    // Only run query when cartOwnerId is available
//         retry: 5,                  // Retry once on failure
//         staleTime: 5 * 60 * 1000   // Cache data for 5 minutes
//     });

//     return { data, isLoading, error }; // Return the result of the query
// }

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
                console.log('Fetching cart from useUserOrders...');
                const cartOwner = await getCart(); // Await the async function and get cartOwner
                console.log('Cart Owner fetched:', cartOwner);
                setCartOwnerId(cartOwner); // Set cartOwner ID in state
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart(); // Call the async function
    }, [getCart]);

    const fetchUserOrders = useCallback(async () => {
        console.log('Fetching user orders...');
        if (!cartOwnerId) {
            console.log('Cart Owner ID is not available yet');
            return []; // Return an empty array if cartOwnerId is not available
        }

        try {
            console.log(`Making API request to fetch user orders for ID: ${cartOwnerId}`);
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
        retry: 5,                  // Retry on failure
        staleTime: 5 * 60 * 1000,  // Cache data for 5 minutes
        onSuccess: (data) => {
            console.log('Query succeeded with data:', data);
        },
        onError: (error) => {
            console.error('Query error:', error);
        },
        onSettled: (data, error) => {
            if (error) {
                console.error('Query settled with error:', error);
            } else {
                console.log('Query settled successfully with data:', data);
            }
        },
    });

    console.log('Query state:', { data, isLoading, error });

    return { data, isLoading, error }; // Return the result of the query
}
