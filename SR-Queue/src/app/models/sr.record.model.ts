import { systemRecord } from './system.record.model';

export interface SrRecord {
    _id: string;
    caseId: string;
    system: string;
    type: string;
    subtype: string;
    status:string;
    description:string;
    systemInfo: systemRecord
  }
  