import { createSlice } from "@reduxjs/toolkit";
import { GetBanner, GetChooseUs, GetCourse, GetGalerry, GetVideoReview } from "../Api/bannerApi";


const initialState = {
  data: [],
  choose:[],
  galerry:[],
  course:[],
  videoReview:[],
};

export const BannerSlicer = createSlice({
  name: "BannerSlicer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetBanner.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(GetChooseUs.fulfilled, (state, action) => {
      state.choose = action.payload;
    });
    builder.addCase(GetGalerry.fulfilled, (state, action) => {
      state.galerry = action.payload;
    });
    builder.addCase(GetCourse.fulfilled, (state, action) => {
      state.course = action.payload;
    });
    builder.addCase(GetVideoReview.fulfilled, (state, action) => {
      state.videoReview = action.payload;
    });
  },
});

export default BannerSlicer.reducer;
