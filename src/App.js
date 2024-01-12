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
          path: "test",
          element: <div>Test</div>
        }
      ]
    },
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
