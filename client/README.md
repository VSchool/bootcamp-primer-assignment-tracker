# Bootcamp Primer Assignment Tracker (Web Client App)

## Authenticated Routes
To make a page require authentication from the user, simply wrap the component in the `withAuthenticationRequired` HOC. This should only need to be used on page-level components in `/routes` that get rendered from [`RouteProvider.jsx`](./src/providers/RouterProvider.jsx). For example:
```js
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedPage = withAuthenticationRequired(() => <div>Protected Page</div>)
```

