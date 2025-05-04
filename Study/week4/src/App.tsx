import './App.css';
import HomePage from './mission1/pages/HomePage';
import MoviePage from './mission1/pages/MoviePage';
import NotFoundPage from './mission1/pages/NotFoundPage';
import MovieDetailPage from './mission1/pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />
      },
      {
        path: '/movie/:movieID',
        element: <MovieDetailPage />
      }
    ],
  },
])

function App(): Element {
  return <RouterProvider router={router} />;
}

export default App;