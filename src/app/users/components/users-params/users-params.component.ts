import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TViewMode, UserDto } from '../../types/users.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-params',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-params.component.html',
  styleUrl: './users-params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersParamsComponent implements OnInit {
  @Output() onViewMode: EventEmitter<TViewMode> = new EventEmitter<TViewMode>();
  @Input() viewMode: TViewMode;
  public searchControl: FormControl = new FormControl('');
  public users$: Observable<UserDto[]>;

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.users$ = this.usersService.users$;
    this.onSearchUsers();
  }

  onSearchUsers() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => {
          this.searchControl.disable();
          return value;
        }),
      )
      .subscribe((search) => {
        this.usersService.getUsersList({ page: 1, search });
        this.searchControl.enable();
      });
  }
}
