export type UserRole = "admin" | "user";

export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}