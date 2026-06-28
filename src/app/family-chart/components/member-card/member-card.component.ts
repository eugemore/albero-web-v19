import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '../../services/family-chart.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.sass',
})
export class MemberCardComponent {
  readonly member = input.required<Person>();
  readonly editionBlocked = input<boolean>(false);
  readonly last = input<boolean>(false);

  readonly editingOutput = output<void>();
  readonly addMemberOutput = output<void>();
  readonly deleteMemberOutput = output<void>();
}