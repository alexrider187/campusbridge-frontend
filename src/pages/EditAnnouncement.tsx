import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAnnouncementById,
  updateAnnouncement,
} from "../api/announcements";
import type { AnnouncementType } from "../types/announcement";

export default function EditAnnouncement() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadAnnouncement = async () => {
      if (!id) return;
      try {
        const announcement: AnnouncementType = await fetchAnnouncementById(id);
        setTitle(announcement.title);
        setContent(announcement.content);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage("⚠️ Failed to load announcement");
        }
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncement();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    if (!id) return;

    try {
      await updateAnnouncement(id, { title, content });
      setMessage("✅ Announcement updated successfully!");
      navigate("/announcements");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("❌ Failed to update announcement");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading announcement...</p>;

  return (
    <div className="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        Edit Announcement
      </h2>

      {message && (
        <p
          className={`mb-4 text-sm text-center ${
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-sm border"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Announcement"}
        </button>
      </form>
    </div>
  );
}
