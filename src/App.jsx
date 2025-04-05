import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./page/Home/Home"
import About from "./page/About/About"
import { Toaster } from "react-hot-toast"
import News from "./page/News/News"
import Courses from "./page/Courses/Courses"


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
      }
    ]
  }])
  return (
    <div className="min-w-[400px]">
       <Toaster/>
       <RouterProvider router={router}/> 
    </div>
  )
}

export default App
