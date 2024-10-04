import { configureStore } from "@reduxjs/toolkit";
import publicKeySlice from "./slices/publicKeySlice";

export const store = configureStore({
  reducer: {
    publicKey: publicKeySlice.reducer,
  }
});

export default store;
