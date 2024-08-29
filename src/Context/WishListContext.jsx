import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Create context for wishlist
export const WishlistContext = createContext();

export default function WishListContextProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Helper function to get headers
    const getHeaders = () => ({
        headers: {
            token: localStorage.getItem('userToken'),
        },
    });

    // Fetch wishlist on mount
    useEffect(() => {
        getWishlist();
    }, []);

    // Function to add a product to the wishlist
    async function addWishlist(productId) {
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                getHeaders()
            );
            // setWishlist((prev) => [...prev, data.data]);
            toast.success(data.message, {
                duration: 2000,
                position: 'top-right',
                className: 'bg-main',
                icon: '👏',
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        } catch (error) {
            console.error('Failed to add item to wishlist:', error);
            toast.error("Failed to add item to wishlist");
        } finally {
            setIsLoading(false);
        }
    }

    // Function to fetch the wishlist
    async function getWishlist() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                getHeaders()
            );
            setWishlist(data);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    }



    async function removeFromWishlist(productId) {
    setIsLoading(true);
    try {
        const { data } = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            getHeaders()
        );

        // Ensure that data.wishlist is an array before updating state
        setWishlist((prev) => {
            if (!Array.isArray(prev)) return []; // Fallback if prev is not an array
            return prev.filter(item => item._id !== productId);
        });

        toast.success("Item removed from wishlist", {
            duration: 2000,
            position: 'top-right',
            className: 'bg-main',
            icon: '👏',
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    } catch (error) {
        console.error('Failed to remove item from wishlist:', error);
        toast.error("Failed to remove item from wishlist");
    } finally {
        setIsLoading(false);
    }
}

    // async function removeFromWishlist(productId) {
    //     setIsLoading(true);
    //     try {
    //         const { data } = await axios.delete(
    //             `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    //             getHeaders()
                
    //         ); setWishlist(response.data.wishlist || []); // Ensure it's an array
    //         setWishlist((prev) => prev.filter(item => item._id !== productId));
    //         toast.success("Item removed from wishlist", {
    //             duration: 2000,
    //             position: 'top-right',
    //             className: 'bg-main',
    //             icon: '👏',
    //             iconTheme: {
    //                 primary: '#000',
    //                 secondary: '#fff',
    //             },
    //             ariaProps: {
    //                 role: 'status',
    //                 'aria-live': 'polite',
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Failed to remove item from wishlist:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // Function to update product count in the wishlist
    async function updateProductCount(productId, count) {
        setIsLoading(true);
        try {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { count },
                getHeaders()
            );
            setWishlist((prev) =>
                prev.map(item =>
                    item.product.id === productId ? { ...item, count } : item
                )
            );
            toast.success(data.message, {
                duration: 2000,
                position: 'top-right',
                className: 'bg-main',
                icon: '👏',
                iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                },
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        } catch (error) {
            console.error('Failed to update item count:', error);
            toast.error("Failed to update item count");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WishlistContext.Provider
            value={{
                addWishlist,
                wishlist,
                getWishlist,
                removeFromWishlist,
                updateProductCount,
                isLoading,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
