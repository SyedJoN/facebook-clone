
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userProfile = createAsyncThunk('auth/userProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/ecommerce/profile',
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'

            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant get user profile')
        }
        const data = await response.json();
        return data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error during registration' });
    }
})
export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/ecommerce/profile',
            {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'

            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant update user profile')
        }
        const data = await response.json();
        return data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error updating user profile' });
    }
})

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/users/register',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant register user')
        }
        const data = await response.json();
        return data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error during registration' });
    }
})

// Async thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {

    try {
        const response = await fetch('http://localhost:8080/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No user found');
        }

        const data = await response.json();
        const { accessToken, refreshToken } = data.data;

        // Setting the accessToken in local storage

        // Set the accessToken cookie with SameSite=None and Secure attributes
        document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}; SameSite=None; Secure`;

        return data;
    } catch (error) {
        return rejectWithValue({ message: error.message || 'Invalid Credentials!' });
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

export const RefreshToken = createAsyncThunk('auth/refresh-token', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/users/refresh-token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No user found');
        }

        const data = await response.json();
        const { accessToken, refreshToken } = data.data;

        // Setting the accessToken in local storage


        // Set the accessToken cookie with SameSite=None and Secure attributes
        document.cookie = `accessToken=${accessToken}; refreshToken=${refreshToken} SameSite=None; Secure`;

        return data;
    } catch (error) {
        return rejectWithValue({ message: error.message || 'Invalid Credentials!' });
    }
});
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {

            document.cookie = "accessToken=; refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";


            const response = await fetch('http://localhost:8080/api/v1/users/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                credentials: 'include'
                // Add any necessary request body or parameters if required
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unable to log out');
            }

            // If logout is successful, return an empty object
            return {};
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Error! Cant logout' });
        }
    }
);


export const forgotPassword = createAsyncThunk(
    '/forget-password',
    async (userData, { rejectWithValue }) => {

        try {
            const response = await fetch('http://localhost:8080/api/v1/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'cant reach email')
            }
            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue({ message: error.message || 'cant send verification email!' })
        }

    });

export const changePassword = createAsyncThunk(
    '/change-password',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/change-password', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'

            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error changing password!');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'password cannot be changed!' })
        }
    })
export const resetPassword = createAsyncThunk(
    '/reset-password',
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'

            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error changing password!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'password cannot be changed!' })
        }
    })

export const updateAvatar = createAsyncThunk(
    'auth/updateAvatar',
    async (avatarData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarData);

            const response = await fetch('http://localhost:8080/api/v1/users/avatar', {
                method: 'PATCH',
                body: formData,
                credentials: 'include',
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update avatar');
            }

            // For debugging, log the response text

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Failed to update avatar' });
        }
    }
);


export const getAddresses = createAsyncThunk('products/fetch', async (qt, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/ecommerce/addresses${qt ? '?' + qt : ''}`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant fetch Addresses')
        }
        const data = await response.json();
        return data.data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error fetching addresses' });
    }
})
export const createAddress = createAsyncThunk('address/create', async ({userData}, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/ecommerce/addresses',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant Create Address')
        }
        const data = await response.json();
        return data.data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error Creating Address' });
    }
})
export const updateAddress = createAsyncThunk('products/update', async ({userId, userData}, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/ecommerce/addresses/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant Update Address')
        }
        const data = await response.json();
        return data.data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error Updating Address' });
    }
})
export const deleteAddress = createAsyncThunk('products/delete', async (userId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/ecommerce/addresses/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json'
                },
                credentials: 'include'
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant Delete Address')
        }
        const data = await response.json();
        return data.data

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error Deleting Address' });
    }
})
export const fetchCountries = createAsyncThunk('countries/fetch', async (_ , { rejectWithValue }) => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all',
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
                credentials: 'include'
            });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Cant fetch Countries')
        }
        const data = await response.json();
        return data;

    } catch (error) {
        return rejectWithValue({ message: error.message || 'Error fetching countries' });
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        currentUser: null,
        isLoading: false,
        error: null,
        status: false,
        addresses: null,
        countries: null,
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.status = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.error = action.payload ? action.payload.message : 'Unable to fetch current user';

            })

            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.status = false;
            })
            .addCase(RefreshToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RefreshToken.fulfilled, (state, action) => {
                state.status = true;
                // handle fulfilled state, update tokens or authentication status
                // action.payload contains new tokens or data
            })
            .addCase(RefreshToken.rejected, (state, action) => {
                state.error = action.error.message
                // handle rejected state, display error message or perform actions
                // action.error contains the error message
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'action error message'
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.currentUser.data.avatar.url = action.payload.data.avatar.url;
            })
            .addCase(userProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.data
            })
            .addCase(userProfile.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                // Assuming action.payload contains the updated user data
                const { firstName, lastName, phoneNumber, countryCode } = action.payload.data;
            
                // Update the state.user object properties individually
                if (firstName) {
                    state.user.firstName = firstName;
                }
            
                if (lastName) {
                    state.user.lastName = lastName;
                }
            
                if (phoneNumber) {
                    state.user.phoneNumber = phoneNumber;
                }
            
                if (countryCode) {
                    state.user.countryCode = countryCode;
                }
            })
            .addCase(getAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.addresses = action.payload.addresses
            })
            .addCase(getAddresses.rejected, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addresses = state.addresses.filter((address) => address._id !== action.payload.deletedAddress._id)
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCountries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.isLoading = false
                state.countries = action.payload
            })
            .addCase(fetchCountries.rejected, (state) => {
                state.isLoading = true
            })
        
    },
})


export default authSlice.reducer
export const { setSearchValue } = authSlice.actions