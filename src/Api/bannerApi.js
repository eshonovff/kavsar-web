import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

// get Banner
export const GetBanner = createAsyncThunk(
  "BannerSlicer/GetBanner",
  async (lang = "Ru") => {
    try {
      const { data } = await axiosRequest.get(`api/Banner?language=${lang}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

//  get  choose us

export const GetChooseUs = createAsyncThunk(
  "BannerSlicer/GetChooseUs",
  async (lang = "Ru") => {
    try {
      const { data } = await axiosRequest.get(`api/ChooseUs?language=${lang}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);

//  get galerry 



export const GetGalerry = createAsyncThunk(
  "BannerSlicer/GetGalerry",
  async () => {
    try {
      const { data } = await axiosRequest.get(`api/Gallery`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);


//  get course 

export const GetCourse = createAsyncThunk(
  "BannerSlicer/GetCourse",
  async (lang = "Ru") => {
    try {
      const { data } = await axiosRequest.get(`api/Course?language=${lang}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);


//  get Video Review


export const GetVideoReview = createAsyncThunk(
  "BannerSlicer/GetVideoReview",
  async (lang = "Ru") => {
    try {
      const { data } = await axiosRequest.get(`api/VideoReview?language=${lang}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);