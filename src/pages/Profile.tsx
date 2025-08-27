import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(""); // optional password update
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-center">No user data found.</p>
      </div>
    );
  }

  const handleUpdate = async () => {
    setMessage(null);
    setIsSaving(true);
    try {
      await updateProfile({ firstName, lastName, password: password || undefined });
      setMessage("✅ Profile updated successfully!");
      setEditing(false);
      setPassword(""); // clear password
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Profile
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm border ${
              message.startsWith("✅")
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              disabled={!editing || isSaving}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                         disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              disabled={!editing || isSaving}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                         disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          {editing && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password (optional)
              </label>
              <input
                type="password"
                value={password}
                disabled={isSaving}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                           disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled={isSaving}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                         disabled:opacity-70"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={user.role}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                         disabled:opacity-70"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-70"
              onClick={() => {
                setEditing(!editing);
                setMessage(null);
                setPassword("");
              }}
              disabled={isSaving}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            {editing && (
              <button
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-70"
                onClick={handleUpdate}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
