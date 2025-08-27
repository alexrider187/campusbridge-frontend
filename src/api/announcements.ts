// api/announcements.ts
import api from "./axiosInstance";
import type { AnnouncementType } from "../types/announcement";

// fetch all announcements
export const fetchAnnouncements = async (): Promise<AnnouncementType[]> => {
  const response = await api.get<AnnouncementType[]>("/announcements");
  return response.data;
};

export const createAnnouncement = async (announcement: { title: string; content: string }) => {
  const { data } = await api.post('/announcements', announcement);
  return data;
};

// fetch single announcement
export const fetchAnnouncementById = async (id: string): Promise<AnnouncementType> => {
  const response = await api.get<AnnouncementType>(`/announcements/${id}`);
  return response.data;
};

export const updateAnnouncement = async (
  id: string,
  data: { title: string; content: string }
) => {
  const response = await api.put(`/announcements/${id}`, data);
  return response.data;
};

export const deleteAnnouncement = async (id: string) => {
  const response = await api.delete(`/announcements/${id}`);
  return response.data;
};
