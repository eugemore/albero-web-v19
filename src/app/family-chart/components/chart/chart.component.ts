import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FamilyChartService, Family, Person } from '../../services/family-chart.service';
import { MemberDialogComponent, PersonDialogData, PersonFormValue } from '../member-dialog/member-dialog.component';
import { MemberCardComponent } from '../member-card/member-card.component';

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
  protected readonly persons = signal<Person[]>([]);
  protected readonly editionBlocked = signal(false);

  protected readonly hasPersons = computed(() => this.persons().length > 0);

  ngOnInit(): void {
    this.service.getFamilies().subscribe(families => {
      if (families.length === 0) return;
      const first = families[0];
      this.family.set(first);
      this.loadPersons(first._id);
    });
  }

  private loadPersons(familyId: string): void {
    this.service.getPersonsByFamily(familyId).subscribe(persons => {
      this.persons.set(persons);
      if (persons.length === 0) {
        this.openPersonDialog(null);
      }
    });
  }

  protected editPerson(index: number): void {
    this.openPersonDialog(this.persons()[index]);
  }

  protected addPerson(): void {
    this.openPersonDialog(null);
  }

  protected deletePerson(index: number): void {
    const person = this.persons()[index];
    if (!person) return;
    this.editionBlocked.set(true);
    this.service.removePerson(person._id).subscribe(() => {
      this.editionBlocked.set(false);
      this.reloadPersons();
    });
  }

  private openPersonDialog(person: Person | null): void {
    const familyId = this.family()?._id;
    if (!familyId) return;
    this.editionBlocked.set(true);

    const data: PersonDialogData = { person, familyId, persons: this.persons() };

    this.dialog
      .open(MemberDialogComponent, { data })
      .afterClosed()
      .subscribe((result: PersonFormValue | null) => {
        this.editionBlocked.set(false);
        if (!result) return;

        if (person) {
          this.service
            .updatePerson({ id: person._id, ...result })
            .subscribe(() => this.reloadPersons());
        } else {
          this.service
            .createPerson({ familyId, ...result })
            .subscribe(() => this.reloadPersons());
        }
      });
  }

  private reloadPersons(): void {
    const familyId = this.family()?._id;
    if (familyId) this.loadPersons(familyId);
  }
}