import { createSlice } from "@reduxjs/toolkit";
import { GetBanner } from "../Api/bannerApi";


const initialState = {
  data: [],
};

export const BannerSlicer = createSlice({
  name: "BannerSlicer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBanner.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default BannerSlicer.reducer;
