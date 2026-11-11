import { api } from "../../../lib/api";
import type { RegisterCredentials, UserResponse } from "../types/register.types";

export async function register(credentials: RegisterCredentials): Promise<UserResponse> {
  const response = await api.post<UserResponse>("/users", credentials);

  return response.data;
}
