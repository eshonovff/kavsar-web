import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/layout"
import Home from "./pages/home/home"
import Courses from "./pages/courses/courses"
import News from "./pages/news/news"
import NewsDetails from "./pages/newsDetails/newsDetails"
import Library from "./pages/library/library"
import BookDetails from "./pages/bookDetails/bookDetails"
import About from "./pages/about/about"
import CourseDetails from "./pages/courseDetails/courseDetails"
import Enrollment from "./pages/enrollment/Enrollment"
import Contact from "./pages/contact/Contact"
import TeacherDetails from "./pages/teacherDetails/TeacherDetails"

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: 'courses',
                    element: <Courses />
                },
                {
                    path: 'courses/:id',
                    element: <CourseDetails />
                },
                {
                    path: 'news',
                    element: <News />
                },
                {
                    path: 'news/:id',
                    element: <NewsDetails />
                },
                {
                    path: 'library',
                    element: <Library />
                },
                {
                    path: 'library/:id',
                    element: <BookDetails />
                },
                {
                    path: 'about',
                    element: <About />
                },
                {
                    path: 'teacher/:id',
                    element: <TeacherDetails />
                },
                {
                    path: 'enrollment',
                    element: <Enrollment />
                },
                {
                    path: '/contact',
                    element: <Contact />
                }
            ]
        }

    ])
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
export default App
