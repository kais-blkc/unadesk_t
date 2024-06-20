import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserDto } from '../../types/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-item',
  standalone: true,
  imports: [],
  templateUrl: './users-item.component.html',
  styleUrl: './users-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersItemComponent {
  @Input() user: UserDto;

  constructor(private usersService: UsersService) {}

  onDeleteUser(id: string): void {
    this.usersService.removeUser(id);
  }
}
