import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { Member } from '../../../shared/models/member.model';
import { CardFormOptions } from '../../models/card-form-options.model';

interface DialogData {
  options: CardFormOptions;
  member: Member | undefined;
  avo: boolean;
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
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  protected readonly memberForm = this.fb.group({
    _id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    middleNames: [''],
    nationality: ['', Validators.required],
    gender: ['', Validators.required],
    status: ['', Validators.required],
    alive: [true, Validators.required],
    birth_date: [DateTime.now().setLocale('it') as DateTime | string, Validators.required],
    avo: [false],
  });

  constructor() {
    if (this.data.member) {
      this.setFormValues(this.data.member);
    }
  }

  private setFormValues(member: Member): void {
    this.memberForm.setValue({
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      middleNames: member.middleNames ?? '',
      nationality:
        this.data.options.nationality.find(
          n => n.toLowerCase() === member.nationality.toLowerCase(),
        ) ?? '',
      status:
        this.data.options.status.find(
          s => s.toLowerCase() === member.status.toLowerCase(),
        ) ?? '',
      gender: member.gender ?? '',
      alive: member.alive,
      birth_date: member.birth_date
        ? DateTime.fromISO(member.birth_date).setLocale('it')
        : DateTime.now().setLocale('it'),
      avo: member.avo ?? this.data.avo ?? false,
    });
  }

  protected save(): void {
    if (this.memberForm.valid) {
      this.dialogRef.close(this.memberForm.getRawValue());
    }
  }

  protected cancel(): void {
    this.dialogRef.close(undefined);
  }
}