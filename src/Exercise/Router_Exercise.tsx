import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>홈 페이지입니다.</h1>
    },
    {
        path: '/movies',
        element: <h1>영화 페이지입니다.</h1>
    }
])

export default function Router_Exercise(): Element{
    return <RouterProvider router={router}/>
}