import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { TItemsPerPage } from '../../types/users.interface';
import { BtnAccentComponent } from '../../../btn-accent/btn-accent.component';

@Component({
  selector: 'app-users-pagination',
  standalone: true,
  imports: [BtnAccentComponent],
  templateUrl: './users-pagination.component.html',
  styleUrl: './users-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPaginationComponent implements OnInit, OnDestroy {
  public itemsPerPage: TItemsPerPage = 5;
  public currentPage: number = 1;
  public totalUsers: number = 0;
  public searchName: string = '';
  private usersSubscribe: Subscription;

  constructor(
    private usersService: UsersService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.usersSubscribe = this.usersService.users$.subscribe(() => {
      this.totalUsers = this.usersService.totalUsers;
      this.searchName = this.usersService.searchName;
      this.currentPage = this.usersService.currentPage;
      this.itemsPerPage = this.usersService.itemsPerPage;
      this.changeDetectorRef.detectChanges();
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.usersService.getUsersList({
      page,
      search: this.searchName,
      itemsPerPage: this.itemsPerPage,
    });
  }

  onItemsPerPageChange(itemsPerPage: TItemsPerPage): void {
    this.itemsPerPage = itemsPerPage;
    this.onPageChange(1);
  }

  ngOnDestroy(): void {
    this.usersSubscribe.unsubscribe();
  }
}
