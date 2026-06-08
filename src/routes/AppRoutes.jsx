import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import GuestRoute from '../components/auth/GuestRoute';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import MapExplorer from '../pages/MapExplorer';
import GrowthAnalysis from '../pages/GrowthAnalysis';
import Prediction from '../pages/Prediction';
import Reports from '../pages/Reports';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <GuestRoute redirectIfAuth>
            <HomePage />
          </GuestRoute>
        }
      />
      <Route path="/register" element={<GuestRoute redirectIfAuth><Register /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute redirectIfAuth><Login /></GuestRoute>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="map" element={<MapExplorer />} />
        <Route path="map/compare" element={<MapExplorer />} />
        <Route path="analysis" element={<GrowthAnalysis />} />
        <Route path="analysis/density" element={<GrowthAnalysis />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/download" element={<Reports />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
