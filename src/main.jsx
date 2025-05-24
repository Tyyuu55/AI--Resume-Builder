import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './auth/sign-in/index.jsx';
import Home from './home/index.jsx';
import Dashboard from './dashboard/index.jsx';
import EditResume from './dashboard/resume/folder/edit/index.jsx';
import ViewResume from './my-resume/[resumeId]/view/index.jsx';
import CareerAdvice from './dashboard/resumeadvice/index.jsx'; // ✅ Import CareerAdvice

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />,
      },
      {
        path: '/dashboard/career-help',  // Add path for Career Help
        element: <CareerAdvice />,       // Render CareerAdvice component
      }
    ]
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
