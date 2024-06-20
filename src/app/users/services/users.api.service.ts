import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ListRequest, UserDto, UserListResponseDto } from '../types/users.interface';
import { mockDB } from '../mockData';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private DB: UserDto[] = mockDB;

  fetchUsersList(request: ListRequest): Observable<UserListResponseDto> {
    let filteredUsers = this.DB;
    const mokDelay = Math.floor(Math.random() * 1000 + 500);
    const startIndex = (request.pageNumber - 1) * request.itemsPerPage;

    if (request.search) {
      filteredUsers = this.filterUsers(filteredUsers, request.search);
    }

    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + request.itemsPerPage);

    return of({
      total_count: filteredUsers.length,
      items: paginatedUsers,
    }).pipe(delay(mokDelay));
  }

  getById(id: string): Observable<UserDto> {
    const user = this.DB.find((user) => user.id === id);
    return of(user!).pipe(delay(500));
  }

  remove(id: string): Observable<void> {
    this.DB = this.DB.filter((user) => user.id !== id);
    return of(undefined).pipe(delay(500));
  }

  filterUsers(users: UserDto[], search: string): UserDto[] {
    return users.filter((user) => user.user_name.toLowerCase().includes(search.toLowerCase()));
  }
}
