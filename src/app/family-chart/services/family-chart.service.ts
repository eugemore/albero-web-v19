import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { Family } from '../../shared/models/family.model';
import { Member } from '../../shared/models/member.model';
import { CardFormOptions } from '../models/card-form-options.model';

interface JwtPayload {
  sub: string;
}

@Injectable({ providedIn: 'root' })
export class FamilyChartService {
  private readonly http = inject(HttpClient);

  private getUserId(): string {
    const token = localStorage.getItem('id_token') ?? '';
    return jwtDecode<JwtPayload>(token).sub;
  }

  getFamily(): Observable<Family> {
    return this.http.get<Family>(`${environment.api}/family/${this.getUserId()}`);
  }

  refreshMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${environment.api}/family/${this.getUserId()}/members`,
    );
  }

  updateFamily(familyId: string, member: Member): Observable<Family> {
    return this.http.put<Family>(`${environment.api}/family/${familyId}`, member);
  }

  getCardFormOptions(): Observable<CardFormOptions> {
    return this.http.get<CardFormOptions>(`${environment.api}/options/cardform`);
  }
}