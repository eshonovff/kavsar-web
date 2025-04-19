import { createSlice } from "@reduxjs/toolkit";
import { GetBanner, GetChooseUs, GetColleague, GetCourse, GetCourseById, GetGalerry, GetNews, GetTextReview, GetVideoReview } from "../Api/bannerApi";


const initialState = {
  data: [],
  choose:[],
  galerry:[],
  course:[],
  videoReview:[],
  textReview:[],
  activeCourse:{},
  newss:[],
  colleague:[],
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
    builder.addCase(GetTextReview.fulfilled, (state, action) => {
      state.textReview = action.payload;
    });
    builder.addCase(GetCourseById.fulfilled, (state, action) => {
      state.activeCourse = action.payload;
    });
    builder.addCase(GetNews.fulfilled, (state, action) => {
      state.newss = action.payload;
    });
    builder.addCase(GetColleague.fulfilled, (state, action) => {
      state.colleague = action.payload;
    });
  },
});

export default BannerSlicer.reducer;
