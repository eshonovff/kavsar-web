import { lazy } from "react";




export const Layout = lazy(() => import("../Layout/Layout.jsx"))

export const Home = lazy(() => import("../page/Home/Home.jsx"))

export const News = lazy(() => import("../page/News/News.jsx"))

export const Courses = lazy(() => import("../page/Courses/Courses.jsx"))

export const About = lazy(() => import("../page/About/About.jsx"))

export const CoursesByID = lazy(() => import("../page/CoursesByID/CoursesByID.jsx"))

export const RequestByID = lazy(() => import("../page/Request/RequestByID.jsx"))

export const Library = lazy(() => import("../page/Library/Library.jsx"))

export const RequestFor = lazy(() => import("../page/RequestFor/RequestFor.jsx"))

export const NotFound = lazy(() => import("../page/NotFound/NotFound.jsx"))