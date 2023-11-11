import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/authuser';

const store = configureStore({
    reducer: {
        guser: userReducer ,
  }
})

export default store;
