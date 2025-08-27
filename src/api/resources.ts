import api from "./axiosInstance";
import type { ResourceType } from "../types/resource";

const BASE_URL = "/resources";

// Get all resources
export const fetchResources = async (): Promise<ResourceType[]> => {
  const { data } = await api.get(BASE_URL);
  return data;
};

// Get single resource by ID
export const fetchResourceById = async (id: string): Promise<ResourceType> => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
};

// Create resource (lecturer only) — supports file upload
export const createResource = async (formData: FormData): Promise<ResourceType> => {
  const { data } = await api.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Update resource (lecturer only)
export const updateResource = async (
  id: string,
  resource: { title: string; description: string; course: string }
): Promise<ResourceType> => {
  const { data } = await api.put(`${BASE_URL}/${id}`, resource);
  return data;
};

// Delete resource (lecturer only)
export const deleteResource = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);
  return data;
};
