import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserResponse } from 'src/app/interfaces/users-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FormatUserService {
  formatUsersResponse(userResponse: UserResponse): User[] {
    const updatedUsers = userResponse.users.map((curr) => {
      const withExistingId = userResponse.data.filter(
        (elem) => elem.user_id === curr.id
      );
      const withAddedProps: any = withExistingId.reduce((acc, curr) => {
        acc['is_admin'] = acc['is_admin'] || curr['is_admin'];
        acc['status'] = acc['status'] || curr['status'];
        acc['is_ecp'] = acc['is_ecp'] || curr['is_ecp'];
        return acc;
      }, {});
      return { isSelected: false, ...curr, ...withAddedProps };
    });
    return this.formatDate(updatedUsers);
  }

  formatDate(users: User[]): User[] {
    return users.map((elem) => ({
      ...elem,
      update_at: new Date(elem.update_at).setHours(0, 0, 0, 0),
      create_at: new Date(elem.create_at).setHours(0, 0, 0, 0),
    }));
  }
}
