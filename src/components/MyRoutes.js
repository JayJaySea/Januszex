import React from 'react';
import SignPage from "../pages/SignPage";
import HomePage from "../pages/HomePage";
// importing components from react-router-dom package
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReservationPage from "../pages/ReservationPage";
import PaymentPage from '../pages/PaymentPage';
import AccountPage, {
  loader as userDetailLoader,
  action as deleteUserAction,
} from "../pages/AccountPage"
import RootLayout from '../pages/Root';
import { action as signAction } from '../components/SignUpForm';
import { action as logoutAction } from '../pages/LogoutPage';
import { checkAuthLoader, tokenLoader } from '../util/auth.js';
import ResHistoryPage, {action as deleteReservationAction} from '../pages/ResHistoryPage';

function MyRoutes() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/sign',
          element: <SignPage />,
          action: signAction,
        },
        {
          path: '/reservation',
          element: <ReservationPage />,
        },
        {
          path: '/payment',
          element: <PaymentPage />,
        },
        {
          path: '/account:userId',
          id: 'user-detail',
          loader: userDetailLoader,
          children: [
            {
              index: true,
              element: <AccountPage />,
              action: deleteUserAction,
            },
            {
              path: '/account:userId/reservationsHistory',
              element: <ResHistoryPage />,
              action: deleteReservationAction,
            },
          ],
        },
        {
          path: '/logout',
          action: logoutAction,
        },

      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default MyRoutes;