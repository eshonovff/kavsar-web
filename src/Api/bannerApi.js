import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";
import { toast } from "react-toastify";

// get Banner
export const GetBanner = createAsyncThunk(
  "BannerSlicer/GetBanner",
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/Banner?language=${language}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

//  get  choose us

export const GetChooseUs = createAsyncThunk(
  "BannerSlicer/GetChooseUs",
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/ChooseUs?language=${language}`);
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
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/Course?language=${language}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);

// Get Course By Id
export const GetCourseById = createAsyncThunk(
  "BannerSlicer/GetCourseById",
  async ({id, language} ) => {
    
    try {
      const { data } = await axiosRequest.get(`api/Course/${id}?language=${language}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);



//  get Video Review


export const GetVideoReview = createAsyncThunk(
  "BannerSlicer/GetVideoReview",
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/VideoReview?language=${language}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);



//  post Request 
export const PostRequest = createAsyncThunk(
  "BannerSlicer/PostRequest",
  async(request, { rejectWithValue }) => {
    console.log("rea", request);
    
    try {
      const { data } = await axiosRequest.post(`api/Request`, request);
      // Показываем уведомление об успехе
      toast.success("Заявка успешно отправлена!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return data.data;
    } catch (error) {
      // Показываем уведомление об ошибке
      toast.error("Ошибка при отправке заявки. Пожалуйста, попробуйте позже.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



//  get text rewiew
export const GetTextReview = createAsyncThunk(
  "BannerSlicer/GetTextReview",
  async (params = { lang: "Ru", pageSize: 100, pageIndex: 1 }) => {
    try {
      // Handle both object params and string-only params for backward compatibility
      const language = typeof params === 'string' ? params : params.lang;
      const pageSize = typeof params === 'string' ? 100 : (params.pageSize || 100);
      const pageIndex = typeof params === 'string' ? 1 : (params.pageIndex || 1);
      
      const { data } = await axiosRequest.get(
        `api/Feedback?language=${language}&pageSize=${pageSize}&pageIndex=${pageIndex}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);


//  post text review 
export const postTextReview = createAsyncThunk(
  "BannerSlicer/postTextReview",
  async (textReview, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(`api/Feedback`, textReview);
 
      dispatch(GetTextReview());

      toast.success("Отзыв успешно отправлен!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return data.data;
    } catch (error) {
      console.error("Ошибка в postTextReview:", error.response?.data || error.message);
      toast.error("Ошибка при отправке отзыва. Пожалуйста, попробуйте позже.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


//  get news 

// Get news
export const GetNews = createAsyncThunk(
  "BannerSlicer/GetNews",
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/News?language=${language}`);
      return data.data;
    } catch (error) {
      console.error(error);
      
    }
  }
);




//// get team 

export const GetColleague = createAsyncThunk(
  "BannerSlicer/GetColleague",
  async (language) => {
    try {
      const { data } = await axiosRequest.get(`api/Colleague/colleagueWithIcons?language=${language}`);
      return data.data;
    } catch (error) { 
      
      console.error(error);
      
    }
  }
);