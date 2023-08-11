export interface User {
  create_at: Date | number;
  email: string;
  id: number;
  isSelected: boolean;
  name: string;
  phone: number;
  update_at: Date | number;
  is_admin: boolean;
  is_ecp: boolean;
  status: string;
}
