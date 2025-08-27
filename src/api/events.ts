import api from "./axiosInstance";
import type { EventType } from "../types/event";

// Get all events
export const fetchEvents = async (): Promise<EventType[]> => {
  const { data } = await api.get("/events");
  return data;
};

// Get single event
export const fetchEventById = async (id: string): Promise<EventType> => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

// Create event (lecturer only)
export const createEvent = async (event: {
  title: string;
  date: string;
  location: string;
  description: string;
}): Promise<EventType> => {
  const { data } = await api.post("/events", event);
  return data;
};

// Update event (lecturer only)
export const updateEvent = async (
  id: string,
  event: Partial<{ title: string; date: string; location: string; description: string }>
): Promise<EventType> => {
  const { data } = await api.put(`/events/${id}`, event);
  return data;
};

// Delete event (lecturer only)
export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};
