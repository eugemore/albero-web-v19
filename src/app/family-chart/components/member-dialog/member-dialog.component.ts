import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { Person } from '../../services/family-chart.service';

export interface PersonDialogData {
  person: Person | null;
  familyId: string;
  persons: Person[];
}

export interface PersonFormValue {
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  placeOfBirth: string | null;
  notes: string | null;
  parentId: string | null;
}

@Component({
  selector: 'app-member-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './member-dialog.component.html',
  styleUrl: './member-dialog.component.sass',
})
export class MemberDialogComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject(MatDialogRef<MemberDialogComponent>);
  readonly data = inject<PersonDialogData>(MAT_DIALOG_DATA);

  protected readonly personForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: [null as DateTime | null],
    placeOfBirth: [''],
    notes: [''],
    parentId: [null as string | null],
  });

  constructor() {
    if (this.data.person) {
      this.setFormValues(this.data.person);
    }
  }

  private setFormValues(person: Person): void {
    this.personForm.patchValue({
      firstName: person.firstName,
      lastName: person.lastName,
      dateOfBirth: person.dateOfBirth ? DateTime.fromISO(person.dateOfBirth) : null,
      placeOfBirth: person.placeOfBirth ?? '',
      notes: person.notes ?? '',
      parentId: person.parent ?? null,
    });
  }

  protected save(): void {
    if (!this.personForm.valid) return;
    const raw = this.personForm.getRawValue();
    const result: PersonFormValue = {
      firstName: raw.firstName,
      lastName: raw.lastName,
      dateOfBirth: raw.dateOfBirth instanceof DateTime
        ? raw.dateOfBirth.toFormat('yyyy-MM-dd')
        : null,
      placeOfBirth: raw.placeOfBirth || null,
      notes: raw.notes || null,
      parentId: raw.parentId || null,
    };
    this.dialogRef.close(result);
  }

  protected cancel(): void {
    this.dialogRef.close(null);
  }
}