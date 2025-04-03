import { configureStore } from "@reduxjs/toolkit";
import BannerSlicer  from "../reducers/bannerList";

export const store = configureStore({
    reducer: {
        BannerSlicer,
    },
  });