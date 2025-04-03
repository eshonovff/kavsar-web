import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";

// get Banner
export const GetBanner = createAsyncThunk(
  "BannerSlicer/GetBanner",
  async (lang = "Ru") => { // Параметри lang бо по умолчание "Ru"
    try {
      const { data } = await axiosRequest.get(`api/Banner?language=${lang}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
