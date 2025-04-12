import axios from "axios";
import { Capsule } from "@/types/capsule";

const API_BASE = "http://localhost:8000"; // change to your backend

export const getAllCapsules = async (): Promise<Capsule[]> => {
  const res = await axios.get(`${API_BASE}/capsules`);
  return res.data;
};

export const getCapsuleByPublicId = async (public_id: string): Promise<Capsule> => {
  const res = await axios.get(`${API_BASE}/capsules/${public_id}`);
  return res.data;
};

export const createCapsule = async (data: {
  name: string;
  email: string;
  title: string;
  message: string;
  unlock_at: string;
}): Promise<Capsule> => {
  const res = await axios.post(`${API_BASE}/create`, data);
  return res.data;
};
