import logo from './logo.svg';
import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout, {loader as layoutLoader } from './pages/layout';
import ErrorPage from './pages/error';

import Home, {loader as homeLoader} from './pages/home';
import AllGames, {loader as allGamesLoader} from './pages/allGames';
import Login from "./pages/login";
import Register from "./pages/register";
import Game, {loader as gameLoader} from './pages/game';
import User , {loader as userLoader} from './pages/user';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/", 
      element: <Layout/>, 
      loader: layoutLoader,
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
        },
        {
          path: "games/:id",
          loader: gameLoader,
          errorElement: <ErrorPage/>,
          element: <Game/>
        },
        {
          path:'user/:id',
          loader: userLoader,
          errorElement: <ErrorPage/>,
          element: <User/>
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
