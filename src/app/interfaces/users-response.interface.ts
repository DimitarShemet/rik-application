export interface UserResponse {
  data: UserData[];
  users: UserDTO[];
}

export interface UserData {
  user_id: number;
  is_admin: boolean;
  is_ecp: boolean;
  status: string;
}
export interface UserDTO {
  create_at: Date;
  email: string;
  id: number;
  name: string;
  phone: number;
  update_at: Date;
}
