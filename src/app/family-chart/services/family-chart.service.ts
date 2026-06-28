import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FamiliesGQL,
  FamiliesQuery,
  PersonsByFamilyGQL,
  PersonsByFamilyQuery,
  CreatePersonGQL,
  UpdatePersonGQL,
  RemovePersonGQL,
  CreatePersonInput,
  UpdatePersonInput,
} from '../../graphql/generated';

export type Family = FamiliesQuery['families'][0];
export type Person = PersonsByFamilyQuery['personsByFamily'][0];

export type { CreatePersonInput, UpdatePersonInput };

@Injectable({ providedIn: 'root' })
export class FamilyChartService {
  private readonly familiesGQL = inject(FamiliesGQL);
  private readonly personsByFamilyGQL = inject(PersonsByFamilyGQL);
  private readonly createPersonGQL = inject(CreatePersonGQL);
  private readonly updatePersonGQL = inject(UpdatePersonGQL);
  private readonly removePersonGQL = inject(RemovePersonGQL);

  getFamilies(): Observable<Family[]> {
    return this.familiesGQL
      .fetch()
      .pipe(map(result => result.data!.families));
  }

  getPersonsByFamily(familyId: string): Observable<Person[]> {
    return this.personsByFamilyGQL
      .fetch({ variables: { familyId } })
      .pipe(map(result => result.data!.personsByFamily));
  }

  createPerson(input: CreatePersonInput): Observable<Person> {
    return this.createPersonGQL
      .mutate({ variables: { input } })
      .pipe(map(result => result.data!.createPerson));
  }

  updatePerson(input: UpdatePersonInput): Observable<Person> {
    return this.updatePersonGQL
      .mutate({ variables: { input } })
      .pipe(map(result => result.data!.updatePerson));
  }

  removePerson(id: string): Observable<string> {
    return this.removePersonGQL
      .mutate({ variables: { id } })
      .pipe(map(result => result.data!.removePerson as string));
  }
}