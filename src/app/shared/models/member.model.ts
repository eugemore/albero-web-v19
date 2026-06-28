import { Document } from './document.model';

export interface Member {
  _id: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  gender: string;
  nationality: string;
  status: string;
  alive: boolean;
  avo: boolean;
  generation: number;
  birth_date?: string;
  documents: Document[];
}