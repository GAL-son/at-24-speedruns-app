import logo from './logo.svg';
import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/layout';
import ErrorPage from './pages/error';

function App() {
  const router = createBrowserRouter([
    { 
      path: "/", 
      element: <Layout/>, 
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          // path: "test",
          element: <div>Test</div>
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
