import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { Assignments } from '../routes/Assignments';
import { Root } from "../routes/Root";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { isLoading, user } = useAuth0();
  const { getUserMetadata } = useProfileContext();

  useEffect(() => {
    if (!user) return;
    getUserMetadata.handler()
  }, [user])

  if (isLoading || getUserMetadata.loading) return <div className="loading-page"><LoadingIndicator /><p>Loading profile information...</p></div>
  return (
    <ReactRouterProvider router={router} />
  )
}