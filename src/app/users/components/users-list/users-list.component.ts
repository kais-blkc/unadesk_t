import { UsersParamsComponent } from '../users-params/users-params.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersItemComponent } from '../users-item/users-item.component';
import { UsersService } from '../../services/users.service';
import { TViewMode, UserDto } from '../../types/users.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UsersPaginationComponent } from '../users-pagination/users-pagination.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UsersItemComponent, UsersParamsComponent, UsersPaginationComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  public users$: Observable<UserDto[]>;
  public viewMode: TViewMode = 'grid';
  public currentPage: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
  }

  changeViewMode(mode: TViewMode) {
    this.viewMode = mode;
  }
}
