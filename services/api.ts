// src/services/api.ts
import axios, { AxiosResponse } from "axios";

export interface User {
  id: number;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
}

const API_URL = "https://random-data-api.com/api/users/random_user?size=80";
const REQUEST_TIMEOUT = 10000;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(API_URL, {
      timeout: REQUEST_TIMEOUT,
    });

    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid or empty user data received");
    }

    return data;
  } catch (err) {
    const errorMessage =
      axios.isAxiosError(err) && err.message
        ? err.message
        : "Unknown error occurred";
    throw new Error(errorMessage);
  }
};
