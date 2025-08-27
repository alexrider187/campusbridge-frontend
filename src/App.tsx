import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import EditAnnouncement from "./pages/EditAnnouncement";
import Resources from "./pages/Resources";
import CreateResource from "./pages/CreateResource";
import EditResource from "./pages/EditResource";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

// 🔹 Private Route wrapper
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Events */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <CreateEvent /> : <Navigate to="/events" />}
            </PrivateRoute>
          }
        />
        <Route
          path="/events/edit/:id"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <EditEvent /> : <Navigate to="/events" />}
            </PrivateRoute>
          }
        />

        {/* Announcements */}
        <Route
          path="/announcements"
          element={
            <PrivateRoute>
              <Announcements />
            </PrivateRoute>
          }
        />
        <Route
          path="/announcements/create"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <CreateAnnouncement /> : <Navigate to="/announcements" />}
            </PrivateRoute>
          }
        />
        <Route
          path="/announcements/edit/:id"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <EditAnnouncement /> : <Navigate to="/announcements" />}
            </PrivateRoute>
          }
        />

        {/* Resources */}
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Resources />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources/create"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <CreateResource /> : <Navigate to="/resources" />}
            </PrivateRoute>
          }
        />
        <Route
          path="/resources/edit/:id"
          element={
            <PrivateRoute>
              {user?.role === "lecturer" ? <EditResource /> : <Navigate to="/resources" />}
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route index element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
