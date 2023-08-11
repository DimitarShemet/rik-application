import { FormControl } from '@angular/forms';

export interface FilterMask {
  create_at: Date;
  email: string;
  is_admin: boolean;
  name: string;
  phone: number;
  status: string;
  update_at: Date;
}

export interface FilterMaskForm {
  create_at: FormControl;
  email: FormControl<string>;
  is_admin: FormControl<boolean>;
  name: FormControl<string>;
  phone: FormControl<number>;
  status: FormControl<string>;
  update_at: FormControl;
}
