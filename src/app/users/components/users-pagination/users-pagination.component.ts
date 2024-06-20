import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BtnAccentComponent } from '../../../share/btn-accent/btn-accent.component';
import { UsersService } from '../../services/users.service';
import { TItemsPerPage } from '../../types/users.interface';
import { Subscription } from 'rxjs';

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
