import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicKey: sessionStorage.getItem("publicKey"),
}

export interface reduxStateType {
  publicKey: string,
}

const publicKeySlice = createSlice({
  name: "publicKeySlice",
  initialState,
  reducers: {
    changePublicKey: (state, action) => {
      state.publicKey = action.payload;
    }
  }
})

export const { changePublicKey } = publicKeySlice.actions;

export default publicKeySlice;
