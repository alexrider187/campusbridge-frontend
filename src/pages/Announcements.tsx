import { useEffect, useState } from "react";
import { fetchAnnouncements, deleteAnnouncement } from "../api/announcements";
import { useAuth } from "../hooks/useAuth";
import type { AnnouncementType } from "../types/announcement";
import { Link } from "react-router-dom"; 

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("❌ Failed to delete announcement");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading announcements...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">
          📭 No announcements available.
        </p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="p-5 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                {/* Announcement Info */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {a.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{a.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    By {a.createdBy.firstName} {a.createdBy.lastName} (
                    {a.createdBy.role})
                  </p>
                </div>

                {/* Actions for Lecturer */}
                {user?.role === "lecturer" && a.createdBy._id === user.id && (
                  <div className="flex space-x-3 mt-3 sm:mt-0 sm:ml-4">
                    {/* ✅ Navigate to edit page */}
                    <Link
                      to={`/announcements/edit/${a._id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
