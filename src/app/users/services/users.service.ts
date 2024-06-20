import { Injectable } from '@angular/core';
import { TItemsPerPage, UserDto, UserListResponseDto } from '../types/users.interface';
import { UsersApiService } from './users.api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

interface IGetUsersListParams {
  page: number;
  search: string;
  itemsPerPage?: TItemsPerPage;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _users: UserDto[];
  public users$: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>([]);
  public itemsPerPage: TItemsPerPage = 5;
  public currentPage: number = 1;
  public searchName: string = '';
  public totalUsers: number = 0;

  constructor(
    private usersApiService: UsersApiService,
    private loadingService: LoadingService,
  ) {
    this.getUsersList({ page: this.currentPage, search: '', itemsPerPage: this.itemsPerPage });
  }

  getUsersList(params: IGetUsersListParams): void {
    this.loadingService.loadingOn();

    this.usersApiService
      .fetchUsersList({
        pageNumber: params.page,
        search: params.search,
        itemsPerPage: params.itemsPerPage || this.itemsPerPage,
      })
      .subscribe((usersResponse) => {
        this.totalUsers = usersResponse.total_count;
        this._users = usersResponse.items;
        this.itemsPerPage = params.itemsPerPage || this.itemsPerPage;
        this.searchName = params.search;
        this.currentPage = params.page;
        this.users$.next(this._users);
        this.loadingService.loadingOff();
      });
  }

  removeUser(id: string): void {
    this.usersApiService.remove(id).subscribe(() => {
      this.getUsersList({ page: this.currentPage, search: this.searchName });
    });
  }
}
