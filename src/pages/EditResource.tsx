import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchResourceById, updateResource } from "../api/resources";
import type { ResourceType } from "../types/resource";

export default function EditResource() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const resource: ResourceType = await fetchResourceById(id);
        setTitle(resource.title);
        setDescription(resource.description);
        setCourse(resource.course);
      } catch  {
        setMessage("❌ Failed to load resource");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!id) return;
  setIsSubmitting(true);

  try {
    const payload = {
      title,
      description,
      course,
      file// ❌ no file since backend only accepts JSON
    };

    await updateResource(id, payload);
    setMessage("✅ Resource updated successfully!");
    navigate("/resources");
  } catch {
    setMessage("❌ Failed to update resource");
  } finally {
    setIsSubmitting(false);
  }
};


  if (loading) return <p className="text-center mt-10">Loading resource...</p>;

  return (
    <div className="max-w-md mx-auto py-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Edit Resource</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {isSubmitting ? "Updating..." : "Update Resource"}
        </button>
      </form>
    </div>
  );
}
