// import axios from "axios";
// import { createContext, useState } from "react";
// import toast from "react-hot-toast";

// export let CartContext =  createContext();

// export default function CartContextProvider({children}) {
//     let headers = {
//         token: localStorage.getItem('userToken')
//     }


//     const [cart, setCart] = useState(null)

//     async function checkout(shippingAddress) {
//         try {

//             let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173/` , 
//                 {
//                     shippingAddress
//                 } , {
//                     headers
//                 },);
//             console.log(data);
//             window.location.href = data.session.url

//         } catch (error) {
//             console.log(error);
//             toast.error('Checkout failed. Please try again.');
            
//         }
//     }

//     async function addProductToCart(productId) {
//         try {
//             let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
//                 {
//                     productId
//                 } , {
//                     headers
//                 },

                
//             );
//             setCart(data)
//             toast.success(data.message,
//                 {
//                     duration: 2000,
//                     position: 'top-right',
                  
//                     // Styling
//                     style: {},
//                     className: 'bg-main',
                  
//                     // Custom Icon
//                     icon: '👏',
                  
//                     // Change colors of success/error/loading icon
//                     iconTheme: {
//                       primary: '#000',
//                       secondary: '#fff',
//                     },
                  
//                     // Aria
//                     ariaProps: {
//                       role: 'status',
//                       'aria-live': 'polite',
//                     },
//                   }
//             );
//         } catch (error) {
//             console.log(error);
            
//         }
//     }


//     async function getCart() {
//         try {
//             let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
//                 headers
//             });
    
//             setCart(data);
//             const cartOwner = data.data.cartOwner;
//             return cartOwner; // Return cartOwner so it can be used elsewhere
//         } catch (error) {
//             console.log(error);
//             return null; // Optionally return null or handle the error as needed
//         }
//     }
    


//     async function updateProductCount(productId , count) {
//         if (count > 0) {
//             try {
//                 let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
//                     {
//                         count
//                     } , {
//                         headers
//                     });
//                 setCart(data)
//                 console.log(data.data);
//             } catch (error) {
//                 console.log(error);
                
//             }
//         }

//     }


//     async function clearCart() {
//         try {
//             let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
//                 {
//                     headers
//                 },

                
//             );
//             setCart(null)
//             console.log(data.data);

           
//         } catch (error) {
//             console.log(error);
            
//         }
//     }

//     async function deleteProduct(productId) {
//         try {
//             let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
//                 {
//                     headers
//                 },

                
//             );
//             setCart(data)
//             console.log(data.data);

           
//         } catch (error) {
//             console.log(error);
            
//         }
//     }

//     return (
//         <CartContext.Provider value={{ clearCart , checkout, deleteProduct, updateProductCount,  addProductToCart , getCart , cart , setCart}}>
//           {children}
//         </CartContext.Provider>
//       );
// }


import axios from 'axios';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem('userToken')
    };

    const [cart, setCart] = useState(null);

    async function checkout(shippingAddress) {
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173/`,
                { shippingAddress },
                { headers }
            );
            console.log('Checkout data:', data); // Log checkout data
            window.location.href = data.session.url;
        } catch (error) {
            console.log('Checkout error:', error);
            toast.error('Checkout failed. Please try again.');
        }
    }

    async function addProductToCart(productId) {
        try {
            let { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/cart',
                { productId },
                { headers }
            );
            setCart(data);
            toast.success(data.message, {
                duration: 2000,
                position: 'top-right',
                style: {},
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
            console.log('Added product to cart:', data);
        } catch (error) {
            console.log('Add product error:', error);
        }
    }

    async function getCart() {
        try {
            console.log('Fetching cart...');
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            });
            setCart(data);
            console.log('Cart data:', data);
            const cartOwner = data.data.cartOwner;
            console.log('Cart Owner:', cartOwner); // Log the cartOwner
            return cartOwner; // Return cartOwner for use elsewhere
        } catch (error) {
            console.log('Get cart error:', error);
            return null; // Optionally return null or handle the error as needed
        }
    }

    async function updateProductCount(productId, count) {
        if (count > 0) {
            try {
                let { data } = await axios.put(
                    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    { count },
                    { headers }
                );
                setCart(data);
                console.log('Updated product count:', data);
            } catch (error) {
                console.log('Update product count error:', error);
            }
        }
    }

    async function clearCart() {
        try {
            let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setCart(null);
            console.log('Cleared cart:', data);
        } catch (error) {
            console.log('Clear cart error:', error);
        }
    }

    async function deleteProduct(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            setCart(data);
            console.log('Deleted product:', data);
        } catch (error) {
            console.log('Delete product error:', error);
        }
    }

    return (
        <CartContext.Provider value={{ clearCart, checkout, deleteProduct, updateProductCount, addProductToCart, getCart, cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
