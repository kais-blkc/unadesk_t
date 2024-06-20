import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-accent',
  standalone: true,
  imports: [],
  templateUrl: './btn-accent.component.html',
  styleUrl: './btn-accent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnAccentComponent {
  @Input() isDisabled: boolean = false;
}
