export interface LoginResponse {
  id: string;
  jwt: string;
  email: string;
  roles: string[];
}
