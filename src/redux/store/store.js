import { configureStore } from "@reduxjs/toolkit";
import CountReducer from '../features/count'

export const store = configureStore({
    reducer:{
        count:CountReducer
    }
})