import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteProvider } from './providers/RouterProvider'
import { AuthProvider } from './providers/AuthProvider';

import './assets/css/global.css'
import { AssignmentsProvider } from './providers/AssignmentsProvider';
import { ProfileProvider } from './providers/ProfileProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <AssignmentsProvider>
          <RouteProvider />
        </AssignmentsProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
)
