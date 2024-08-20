import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishListContextProvider({ children }) {
    

    const headers = {
        token: localStorage.getItem('userToken'),
    };

    const [wishlist, setWishlist] = useState([]);

    async function addWishlist(productId) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                { headers }
            );
            setWishlist((prev) => [...prev, data.data]);
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
            console.log(error);
            toast.error("Failed to add item to wishlist");
        }
    }

    async function getwishlist() {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
            {
                headers
            });

            setWishlist(data);
        } catch (error) {
            console.log(error);
            
        }
    }
    
    async function removeFromWishlist(productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , 
                {
                    headers
                },

                
            );
            setWishlist(data)
            console.log(data.data);

           
        } catch (error) {
            console.log(error);
            
        }
    }

    async function updateProductCount(productId, count) {
        try {
            const { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { count },
                { headers }
            );
            setWishlist((prev) => prev.map(item =>
                item.product.id === productId ? { ...item, count } : item
            ));
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
            console.log(error);
            toast.error("Failed to update item count");
        }
    }

    return (
        <WishlistContext.Provider value={{ addWishlist, wishlist, getwishlist, removeFromWishlist, updateProductCount }}>
            {children}
        </WishlistContext.Provider>
    );
}
