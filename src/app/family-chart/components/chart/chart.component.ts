import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { FamilyChartService } from '../../services/family-chart.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Family } from '../../../shared/models/family.model';
import { Member } from '../../../shared/models/member.model';
import { CardFormOptions } from '../../models/card-form-options.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.sass',
})
export class ChartComponent implements OnInit {
  private readonly service = inject(FamilyChartService);
  private readonly dialog = inject(MatDialog);

  protected readonly family = signal<Family | null>(null);
  protected readonly familyMembers = signal<Member[]>([]);
  protected readonly editOptions = signal<CardFormOptions | null>(null);
  protected readonly editionBlocked = signal(false);

  protected readonly hasFamilyMembers = computed(() => this.familyMembers().length > 0);

  ngOnInit(): void {
    forkJoin({
      family: this.service.getFamily(),
      options: this.service.getCardFormOptions(),
    }).subscribe(({ family, options }) => {
      this.family.set(family);
      this.editOptions.set(options);
      this.initMembers(family.members);
    });
  }

  private initMembers(members: Member[]): void {
    if (members?.length > 0) {
      this.familyMembers.set(members);
    } else {
      this.openMemberDialog(undefined, true);
    }
  }

  protected editMember(index: number): void {
    this.openMemberDialog(this.familyMembers()[index]);
  }

  protected addMember(): void {
    this.openMemberDialog(undefined, false);
  }

  private openMemberDialog(member: Member | undefined, avo = false): void {
    this.editionBlocked.set(true);

    this.dialog
      .open(MemberDialogComponent, {
        data: { options: this.editOptions(), member, avo },
      })
      .afterClosed()
      .subscribe((updated: Member | undefined) => {
        if (updated) {
          this.persistMemberUpdate(updated);
        }
        this.editionBlocked.set(false);
      });
  }

  private persistMemberUpdate(member: Member): void {
    const currentFamily = this.family();
    if (!currentFamily) return;

    this.service.updateFamily(currentFamily._id, member).subscribe(() => {
      this.refreshMembers();
    });
  }

  protected deleteMember(index: number): void {
    this.familyMembers.update(members => members.filter((_, i) => i !== index));
  }

  private refreshMembers(): void {
    this.service.refreshMembers().subscribe(members => {
      this.familyMembers.set(members);
    });
  }
}