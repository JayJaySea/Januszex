import React from 'react';
import SignPage from "../pages/SignPage";
import HomePage from "../pages/HomePage";
// importing components from react-router-dom package
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PersInfoPage from "../pages/PersInfoPage";
import PaymentPage from '../pages/PaymentPage';
import AccountPage from "../pages/AccountPage"
import RootLayout from '../pages/Root';
import { action as signAction } from '../components/SignUpForm';
import { action as logoutAction} from '../pages/LogoutPage';
import { checkAuthLoader, tokenLoader } from '../util/auth.js';

function MyRoutes() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      //errorElement: <ErrorPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'sign',
          element: <SignPage />,
          action: signAction,
        },
        {
          path: 'persInfo',
          element: <PersInfoPage />,
          //action: newsletterAction,
        },
        {
          path: 'payment',
          element: <PaymentPage />,
          //action: logoutAction,
        },
        {
          path: 'account',
          element: <AccountPage />,
          //action: logoutAction,
        },
        {
          path: 'logout',
          action: logoutAction,
        }
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default MyRoutes;