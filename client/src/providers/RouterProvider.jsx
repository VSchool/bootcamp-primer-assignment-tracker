import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { Assignments } from '../routes/Assignments';
import { Root } from "../routes/Root";
import { Home } from "../routes/Home";
import { useProfileContext } from "../hooks";
import { useEffect } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/assignments',
        element: <Assignments />,
      }
    ]
  },
])

export const RouteProvider = () => {
  const { getUserProfileFactory, user, isLoading, error } = useProfileContext();
  const getUserProfile = getUserProfileFactory();

  useEffect(() => {
    if (!user.sub) return;
    if (user.sub && !user.profile.fullName && !getUserProfile.error) getUserProfile.handler()
  }, [user, getUserProfile])

  if (isLoading || getUserProfile.loading) return (
    <div className="loading-page"><LoadingIndicator />
      <p>Loading profile information...</p>
    </div>
  )
  if (error || getUserProfile.error) return (
    <div className="error-page">
      <p className="typography typography-error">There was a problem logging in.</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  )
  return (
    <ReactRouterProvider router={router} />
  )
}