import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { FormatUserService } from '../format-services/users-format.service';
import { UserResponse } from 'src/app/interfaces/users-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(
    private http: HttpClient,
    private formatUsersService: FormatUserService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<UserResponse>(
        'http://cars.cprogroup.ru/api/rubetek/angular-testcase-list/'
      )
      .pipe(
        map((userResponse) =>
          this.formatUsersService.formatUsersResponse(userResponse)
        )
      );
  }
}
