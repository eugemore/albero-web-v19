import { DocFile } from './docfile.model';

export interface Document {
  status: string;
  type: string;
  relatedFiles: DocFile[];
}