
import { Toaster } from "react-hot-toast"

import { ScrollProvider } from "./hook/ScrollProvider"

import { ToastContainer } from "react-toastify"

import { About, Courses, CoursesByID, Home, Layout, Library, News, NotFound, RequestByID, RequestFor } from "./routes/routes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"



const App = () => {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
     path:"/news",
     element: <News />
      },
      {
        path:"/courses",
        element: <Courses />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/course/:id",
        element: <CoursesByID />
      },
      {
        path: "/course/:id/RequestByID",
        element: <RequestByID />
      },
      {
        path:"/library",
        element: <Library />
      },
      {
        path:"*",
        element: <NotFound />
      },
      {
        path:"/requstorInstagram",
        element: <RequestFor/>
      }
    ]
  }])
  return (
    <ScrollProvider>

    <div className="min-w-[400px]">
       <Toaster/>
       <RouterProvider router={router}/> 
       <ToastContainer />
    </div>
    </ScrollProvider>
  )
}

export default App
