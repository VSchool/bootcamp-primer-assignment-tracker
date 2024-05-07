import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteProvider } from './providers/RouterProvider'
import { AuthProvider } from './providers/AuthProvider';

import './assets/global.css'
import { AssignmentsProvider } from './providers/AssignmentsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AssignmentsProvider>
        <RouteProvider />
      </AssignmentsProvider>
    </AuthProvider>
  </React.StrictMode>
)
