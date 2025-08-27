import { useState } from "react";
import { createAnnouncement } from "../api/announcements";
import axios from "axios";

export default function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      await createAnnouncement({ title, content });
      setMessage("✅ Announcement created successfully!");
      setTitle("");
      setContent("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message || "❌ Failed to create announcement"
        );
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("⚠️ An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        Create Announcement
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
          {isSubmitting ? "Creating..." : "Create Announcement"}
        </button>
      </form>
    </div>
  );
}
