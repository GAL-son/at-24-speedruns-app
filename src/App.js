import logo from './logo.svg';
import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/layout';
import ErrorPage from './pages/error';

import Home, {loader as homeLoader} from './pages/home';
import AllGames, {loader as allGamesLoader} from './pages/allGames';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/", 
      element: <Layout/>, 
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          loader: homeLoader,
          element: <Home/>,
        },
        {
          path:"games",
          loader: allGamesLoader,
          element: <AllGames/>
        }
      ]
    },
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
