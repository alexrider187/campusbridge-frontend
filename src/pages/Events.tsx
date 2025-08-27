import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents, deleteEvent } from "../api/events";
import { useAuth } from "../hooks/useAuth";
import type { EventType } from "../types/event";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to delete event");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-center">Loading events...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center sm:text-left">
          Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500 text-center">No events found.</p>
        ) : (
          <ul className="space-y-5">
            {events.map((event) => (
              <li
                key={event._id}
                className="p-5 bg-white rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
              >
                {/* Event details */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleString()}
                  </p>
                  <p className="text-gray-700">{event.location}</p>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-xs text-gray-400">
                    Created by: {event.createdBy.firstName}{" "}
                    {event.createdBy.lastName} ({event.createdBy.role})
                  </p>
                </div>

                {/* Lecturer controls */}
                {user?.role === "lecturer" &&
                  event.createdBy._id === user.id && (
                    <div className="flex sm:flex-col gap-3">
                      <button
                        onClick={() => navigate(`/events/edit/${event._id}`)}
                        className="px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="px-3 py-1 rounded-md text-sm bg-red-100 text-red-600 hover:bg-red-200 transition"
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
    </div>
  );
}
