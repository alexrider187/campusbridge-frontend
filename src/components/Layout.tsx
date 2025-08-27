import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X } from "lucide-react"; 

export default function Layout() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (isActive: boolean) =>
    `block px-3 py-2 rounded-md hover:text-indigo-600 ${
      isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            CampusBridge
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 items-center">
              {!user ? (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => navLinkClass(isActive)}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({ isActive }) => navLinkClass(isActive)}>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-gray-700 font-medium">Hi, {user.firstName || user.email}</li>
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => navLinkClass(isActive)}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/events" className={({ isActive }) => navLinkClass(isActive)}>
                      Events
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/events/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Event
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/announcements" className={({ isActive }) => navLinkClass(isActive)}>
                      Announcements
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/announcements/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Announcement
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/resources" className={({ isActive }) => navLinkClass(isActive)}>
                      Resources
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/resources/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Resource
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <button onClick={logout} className="text-gray-700 hover:text-red-500 transition">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-50 border-t border-gray-200">
            <ul className="flex flex-col space-y-2 p-4">
              {!user ? (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => navLinkClass(isActive)}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({ isActive }) => navLinkClass(isActive)}>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-gray-700 font-medium">Hi, {user.firstName || user.email}</li>
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => navLinkClass(isActive)}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/events" className={({ isActive }) => navLinkClass(isActive)}>
                      Events
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/events/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Event
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/announcements" className={({ isActive }) => navLinkClass(isActive)}>
                      Announcements
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/announcements/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Announcement
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/resources" className={({ isActive }) => navLinkClass(isActive)}>
                      Resources
                    </NavLink>
                  </li>
                  {user.role === "lecturer" && (
                    <li>
                      <NavLink to="/resources/create" className={({ isActive }) => navLinkClass(isActive)}>
                        Create Resource
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left text-gray-700 hover:text-red-500 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow py-4 mt-10">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} CampusBridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
