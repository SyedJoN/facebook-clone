
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProducts = createAsyncThunk('products/fetch', async (query, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/ecommerce/products?${query}`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                }
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant fetch Products')
        }
        const data = await response.json();
        return data.data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error fetching products' });
    }
})
export const fetchCategories = createAsyncThunk('products/fetch-categories', async (qt, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/ecommerce/categories${qt ? '?' + qt : ''}`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                }
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant fetch Categories')
        }
        const data = await response.json();
        return data.data.categories

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error fetching categories' });
    }
})

export const fetchProductsCat = createAsyncThunk('products/fetchByCat', async (_, { rejectWithValue }) => {



    try {
        const response = await fetch('http://localhost:8080/api/v1/ecommerce/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No Category Products Found');
        }

        const data = await response.json();
        return data.categories;


    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error fetching Category Products' });
    }
});


export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/current-user', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'jwt malformed') {
                    throw new Error('Unable to authenticate. Please log in again.');
                } else {
                    throw new Error(errorData.message || 'Unable to fetch current user');
                }
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error fetching user' });
        }
    }
);
export const getUserCart = createAsyncThunk(
    'user/get-cart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/ecommerce/cart', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'jwt malformed') {
                    throw new Error('Unable to authenticate. Please log in again.');
                } else {
                    throw new Error(errorData.message || 'Unable to fetch current user');
                }
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error fetching user' });
        }
    }
);

export const createProduct = createAsyncThunk(
    'auth/createProduct',
    async (userData, { rejectWithValue }) => {
        try {
      
            const response = await fetch('http://localhost:8080/api/v1/ecommerce/products', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                },
                body: userData,
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error creating product!' });
        }
    }
);
export const addToCart = createAsyncThunk(
    'product/add-to-cart',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {

            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/cart/item/${productId}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error creating product!' });
        }
    }
);
export const removeItemFromCart = createAsyncThunk(
    'product/remove-item-cart',
    async (productId, { rejectWithValue }) => {
        try {

            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/cart/item/${productId}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create product');
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error creating product!' });
        }
    }
);
export const clearCart = createAsyncThunk(
    'product/clear-cart',
    async (_, { rejectWithValue }) => {
        try {

            const response = await fetch('http://localhost:8080/api/v1/ecommerce/cart/clear', {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to clear cart');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error clearing cart!' });
        }
    }
);
export const updateProduct = createAsyncThunk(
    'auth/updateProduct',
    async ({ id, userData }, { rejectWithValue }) => {

        try {

            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                },
                body: userData,
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error updating product!' });
        }
    }
);
export const removeSubImages = createAsyncThunk(
    'auth/removeSubImages',
    async ({ productId, subImageId }, { rejectWithValue }) => {
        try {

            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/products/remove/subimage/${productId}/${subImageId}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include',

            });

            if (!response.ok) {
                const errorText = await response.text(); // Capture the error response as text
                console.error('Error removing subImage - Raw Response:', errorText);
                throw new Error('Failed to remove subImage');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error handling:', error);

            return rejectWithValue({ message: error.message || 'Error removing subImage!' });
        }
    }
);


export const getProductById = createAsyncThunk(
    'product/id',
    async (id, { rejectWithValue }) => {
        try {

            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/products/${id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch product');
            }


            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error fetching product!' });
        }
    }
);



export const deleteProductById = createAsyncThunk(
    '/delete-product',
    async (id, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant delete product')
            }
            const data = await response.json();
            return data.data.deletedProduct;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'product not found!' })
        }

    })

export const createCoupon = createAsyncThunk(
    '/coupons/create-coupon',
    async (couponData, { rejectWithValue }) => {

        try {
            const response = await fetch('http://localhost:8080/api/v1/ecommerce/coupons', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(couponData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant create coupon')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error!' })
        }

    })

export const updateCoupon = createAsyncThunk(
    '/coupons/update-coupon',
    async ({couponId, couponData}, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/coupons/${couponId}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(couponData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant update coupon')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error updating coupon!' })
        }

    });
export const deleteCoupon = createAsyncThunk(
    '/coupons/delete-coupon',
    async (couponId, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/coupons/${couponId}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant delete coupon!')
            }
            const data = await response.json();
            return data.deletedCoupon;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error deleting coupon!' })
        }

    });
export const getCoupons = createAsyncThunk(
    '/coupons/get-coupons',
    async (query, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/coupons?${query}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant fetch coupons')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'coupons not found!' })
        }

    });
export const getCouponById = createAsyncThunk(
    '/coupons/get-coupon-by-id',
    async (couponId, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/coupons/${couponId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant get coupon')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'coupon not found!' })
        }

    });

export const applyCoupon = createAsyncThunk(
    'coupon/apply-coupon',
    async ({couponCode}, { rejectWithValue }) => {

        try {
            const response = await fetch('http://localhost:8080/api/v1/ecommerce/coupons/c/apply', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({couponCode}),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid Coupon')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'Invalid Coupon Code!' })
        }

    });
export const setCouponStatus = createAsyncThunk(
    'coupon/set-coupon-status',
    async ({couponId, couponData}, { rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/ecommerce/coupons/status/${couponId}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(couponData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid Coupon')
            }
            const data = await response.json();
            return data.data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'Invalid Coupon Code!' })
        }

    });



const productSlice = createSlice({
    name: 'product',
    initialState: {
        userCart: {
            data: {
                _id: '',
                cartTotal: 0,
                coupon: {}, // Empty coupon object or default values
                discountedTotal: 0,
                items: [], // Empty items array
            },
            message: '',
            statusCode: 0,
            success: false,
        },
        specificProduct: null,
        isLoading: false,
        products: null,
        catProducts: null,
        categories: null,
        error: null,
        coupons: null,
        specificCoupon: null
    },




    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductsCat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsCat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.catProducts = action.payload;
            })
            .addCase(fetchProductsCat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;

            })
            .addCase(deleteProductById.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;

            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter((prev) => prev._id !== action.payload._id)

            })
            .addCase(deleteProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;

            })

            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.specificProduct = action.payload.data;

            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })

            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.specificProduct = action.payload.data;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;

                const {
                    data = {},
                    message = '',
                    statusCode = 0,
                    success = false
                } = action.payload || {};

                if (success) {
                    state.userCart.data = {
                        _id: data._id || '',
                        cartTotal: data.cartTotal || 0,
                        coupon: data.coupon || {},
                        discountedTotal: data.discountedTotal || 0,
                        items: [],
                    };

                    // Consolidate items with the same ID by summing their quantities
                    const itemMap = new Map();
                    data.items.forEach((item) => {
                        const existingItem = itemMap.get(item.product._id);
                        if (existingItem) {
                            // Clone the existing item to avoid mutation
                            const updatedItem = { ...existingItem };
                            updatedItem.quantity += item.quantity;
                            itemMap.set(item.product._id, updatedItem);
                        } else {
                            itemMap.set(item.product._id, { ...item });
                        }
                    });

                    // Add the consolidated items to state
                    state.userCart.data.items = Array.from(itemMap.values());

                    state.userCart.message = message;
                    state.userCart.statusCode = statusCode;
                    state.userCart.success = success;
                }
            })



            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;

                const {
                    data = {},
                    message = '',
                    statusCode = 0,
                    success = false
                } = action.payload || {};

                if (success) {
                    const { product, quantity } = data; // Assuming the response includes the product and its quantity

                    // Check if the product already exists in the cart
                    const existingItemIndex = state.userCart.data.items.findIndex(item => item.product._id === product._id);

                    if (existingItemIndex !== -1) {
                        // Product exists, update quantity
                        state.userCart.data.items[existingItemIndex].quantity += quantity;
                    } else {
                        // Product doesn't exist, add as a new item
                        state.userCart.data.items.push({
                            product,
                            quantity
                        });
                    }

                    state.userCart.message = message;
                    state.userCart.statusCode = statusCode;
                    state.userCart.success = success;
                }
            })


            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(getCoupons.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupons = action.payload.coupons;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'no coupons found'
            })
            .addCase(getCouponById.pending, (state)=> {
                state.isLoading = true;
    
            })
            .addCase(getCouponById.fulfilled, (state, action)=> {
                state.isLoading = false;
                state.specificCoupon = action.payload;
            })
            .addCase(getCouponById.rejected, (state, action)=> {
                state.isLoading = false;
                state.error = action.error.message || 'no coupon with such id found'

            })
            .addCase(applyCoupon.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userCart.data.cartTotal = action.payload.discountedTotal
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error applying coupon'
            })
            .addCase(removeItemFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.isLoading = false;

                const { items, cartTotal, discountedTotal } = action.payload;


                state.userCart.data.items = items;


                state.userCart.data.cartTotal = cartTotal;
                state.userCart.data.discountedTotal = discountedTotal;


            })
            .addCase(clearCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.userCart.data = action.payload.data;

            })

            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.specificProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(removeSubImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeSubImages.fulfilled, (state, action) => {
                state.isLoading = false;
                if (Array.isArray(state.specificProduct.sub)) {
                    state.specificProduct = state.specificProduct.map((prev) =>
                        prev._id === action.payload.data._id
                            ? { ...prev, subImages: action.payload.data.subImages }
                            : prev
                    );
                }
            })
            .addCase(removeSubImages.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'action error message'

            })



    },
});


export default productSlice.reducer
export const { updateMainImageUrl } = productSlice.actions