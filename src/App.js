import logo from './logo.svg';
import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/layout';
import ErrorPage from './pages/error';

import Home, {loader as homeLoader} from './pages/home';
import AllGames, {loader as allGamesLoader} from './pages/allGames';
import Login from "./pages/login";
import Register from "./pages/register";

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
        },
        {
          path:"login",
          element: <Login/>
        },
        {
          path:"register",
          element: <Register/>
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
