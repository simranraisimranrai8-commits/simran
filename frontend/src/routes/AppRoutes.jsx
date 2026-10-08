import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

import Dashboard from '../pages/admin/Dashboard'
import UsersPage from '../pages/admin/UsersPage'
import Employers from '../pages/admin/Employers'
import JobsAdmin from '../pages/admin/JobsAdmin'
import Applications from '../pages/admin/Applications'
import ServicesAdmin from '../pages/admin/ServicesAdmin'
import Providers from '../pages/admin/Providers'
import Orders from '../pages/admin/Orders'
import Payments from '../pages/admin/Payments'
import Pricing from '../pages/admin/Pricing'
import Notifications from '../pages/admin/Notifications'
import Reports from '../pages/admin/Reports'
import Cms from '../pages/admin/Cms'
import AuditLogs from '../pages/admin/AuditLogs'
import SettingsPage from '../pages/admin/SettingsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="employers" element={<Employers />} />
          <Route path="jobs" element={<JobsAdmin />} />
          <Route path="applications" element={<Applications />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="providers" element={<Providers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="cms" element={<Cms />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}
