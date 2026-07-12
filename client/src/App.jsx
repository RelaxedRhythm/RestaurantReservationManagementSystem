import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";
import AdminDashboard from "./pages/adminDashboard";
import BookReservationPage from "./pages/bookReservation";
import CustomerDashboard from "./pages/customerDashboard";
import LoginPage from "./pages/login";
import ManageTablesPage from "./pages/manageTables";
import MyReservationsPage from "./pages/myReservation";
import RegisterPage from "./pages/register";

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="page">{children}</main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CustomerDashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/book"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BookReservationPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reservations"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MyReservationsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AppLayout>
                  <AdminDashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tables"
            element={
              <ProtectedRoute role="admin">
                <AppLayout>
                  <ManageTablesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
