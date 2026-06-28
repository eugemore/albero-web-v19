import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Member } from '../../../shared/models/member.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.sass',
})
export class MemberCardComponent {
  readonly member = input.required<Member>();
  readonly editionBlocked = input<boolean>(false);
  readonly last = input<boolean>(false);

  readonly editingOutput = output<void>();
  readonly addMemberOutput = output<void>();
  readonly deleteMemberOutput = output<void>();
}