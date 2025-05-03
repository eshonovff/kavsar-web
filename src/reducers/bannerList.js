import {createSlice} from "@reduxjs/toolkit";
import {GetBanner, GetChooseUs, GetColleague, GetCourse, GetCourseById, GetGalerry, GetNews, GetTextReview, GetVideoReview} from "../Api/bannerApi";

const initialState = {
    data: [],
    choose: [],
    gallery: [],
    course: [],
    videoReview: [],
    textReview: [],
    activeCourse: {},
    newss: [],
    colleague: [],
    loading: {
        banner: false,
        chooseUs: false,
        course: false,
        videoReview: false,
        textReview: false,
        activeCourse: false,
        news: false,
        gallery: false,
        colleague: false,

    },
    error: {
        banner: null,
        chooseUs: null,
        course: null,
        videoReview: null,
        textReview: null,
        activeCourse: null,
        news: null,
    }
};

export const BannerSlicer = createSlice({
    name: "BannerSlicer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // GetBanner
        builder.addCase(GetBanner.pending, (state) => {
            state.loading.banner = true;
            state.error.banner = null;
        });
        builder.addCase(GetBanner.fulfilled, (state, action) => {
            state.loading.banner = false;
            state.data = action.payload;
        });
        builder.addCase(GetBanner.rejected, (state, action) => {
            state.loading.banner = false;
            state.error.banner = action.error.message;
        });

        // GetChooseUs
        builder.addCase(GetChooseUs.pending, (state) => {
            state.loading.chooseUs = true;
            state.error.chooseUs = null;
        });
        builder.addCase(GetChooseUs.fulfilled, (state, action) => {
            state.loading.chooseUs = false;
            state.choose = action.payload;
        });
        builder.addCase(GetChooseUs.rejected, (state, action) => {
            state.loading.chooseUs = false;
            state.error.chooseUs = action.error.message;
        });

        // GetGalerry

        builder.addCase(GetGalerry.fulfilled, (state, action) => {
            state.loading.gallery = false;
            state.gallery = action.payload;
        });
        builder.addCase(GetGalerry.pending, (state) => {
            state.loading.gallery = true;
        })


        // GetCourse
        builder.addCase(GetCourse.pending, (state) => {
            state.loading.course = true;
            state.error.course = null;
        });
        builder.addCase(GetCourse.fulfilled, (state, action) => {
            state.loading.course = false;
            state.course = action.payload;
        });
        builder.addCase(GetCourse.rejected, (state, action) => {
            state.loading.course = false;
            state.error.course = action.error.message;
        });

        // GetVideoReview
        builder.addCase(GetVideoReview.pending, (state) => {
            state.loading.videoReview = true;
            state.error.videoReview = null;
        });
        builder.addCase(GetVideoReview.fulfilled, (state, action) => {
            state.loading.videoReview = false;
            state.videoReview = action.payload;
        });
        builder.addCase(GetVideoReview.rejected, (state, action) => {
            state.loading.videoReview = false;
            state.error.videoReview = action.error.message;
        });

        // GetTextReview
        builder.addCase(GetTextReview.pending, (state) => {
            state.loading.textReview = true;
            state.error.textReview = null;
        });
        builder.addCase(GetTextReview.fulfilled, (state, action) => {
            state.loading.textReview = false;
            state.textReview = action.payload;
        });
        builder.addCase(GetTextReview.rejected, (state, action) => {
            state.loading.textReview = false;
            state.error.textReview = action.error.message;
        });

        // GetCourseById
        builder.addCase(GetCourseById.pending, (state) => {
            state.loading.activeCourse = true;
            state.error.activeCourse = null;
        });
        builder.addCase(GetCourseById.fulfilled, (state, action) => {
            state.loading.activeCourse = false;
            state.activeCourse = action.payload;
        });
        builder.addCase(GetCourseById.rejected, (state, action) => {
            state.loading.activeCourse = false;
            state.error.activeCourse = action.error.message;
        });

        // GetNews
        builder.addCase(GetNews.pending, (state) => {
            state.loading.news = true;
            state.error.news = null;
        });
        builder.addCase(GetNews.fulfilled, (state, action) => {
            state.loading.news = false;
            state.newss = action.payload;
        });
        builder.addCase(GetNews.rejected, (state, action) => {
            state.loading.news = false;
            state.error.news = action.error.message;
        });

        // GetColleague

        builder.addCase(GetColleague.fulfilled, (state, action) => {
            state.loading.colleague = false;
            state.colleague = action.payload;
        });
        builder.addCase(GetColleague.pending, (state) => {
            state.loading.colleague = true;
        })

    },
});

export default BannerSlicer.reducer;