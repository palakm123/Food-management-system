import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApis/authApi";


const Store = configureStore({
    reducer: {
    [authApi.reducerPath]: authApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware)
})
export default Store;