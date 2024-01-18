export interface User {
  id: string;
  profile_picture: string;
  email: string;
  organizations?: Array<{
    id: string;
    name: string;
    role: string;
    is_default: boolean;
  }>;
}
