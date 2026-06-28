import { Member } from './member.model';
import { Owner } from './owner.model';

export interface Family {
  _id: string;
  owner: Owner;
  members: Member[];
}