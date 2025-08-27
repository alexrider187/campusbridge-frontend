import { useEffect, useState } from "react";
import { fetchResources, deleteResource } from "../api/resources";
import { useAuth } from "../hooks/useAuth";
import type { ResourceType } from "../types/resource";
import { Link } from "react-router-dom";

export default function Resources() {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        // Define the expected response type
        type FetchResourcesResponse =
          | ResourceType[]
          | { resources: ResourceType[] };

        const data: FetchResourcesResponse = await fetchResources();

        // ✅ Normalize response: handle both array and wrapped object
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray((data as { resources?: ResourceType[] })?.resources)
          ? (data as { resources: ResourceType[] }).resources
          : [];

        setResources(normalized);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setResources([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id);
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete resource.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading resources...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Resources</h2>

      {user?.role === "lecturer" && (
        <Link
          to="/resources/create"
          className="inline-block mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Upload Resource
        </Link>
      )}

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources found.</p>
      ) : (
        <ul className="space-y-4">
          {resources.map((r) => (
            <li
              key={r._id}
              className="p-4 bg-white rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-gray-600">{r.description}</p>
                <a
                  href={r.fileUrl.startsWith("http") ? r.fileUrl : `/${r.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block mt-1"
                >
                  View File
                </a>
                <p className="text-xs text-gray-400">
                  By {r.uploader?.firstName} {r.uploader?.lastName} (
                  {r.uploader?.role})
                </p>
              </div>

              {user?.role === "lecturer" && r.uploader?._id === user.id && (
                <div className="flex space-x-2">
                  <Link
                    to={`/resources/edit/${r._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
