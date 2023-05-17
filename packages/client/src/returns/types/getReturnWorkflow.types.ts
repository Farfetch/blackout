import type { Config } from '../../index.js';
import type { Return } from './return.types.js';

export enum ReturnWorkflowStatus {
  WaitingExternalApproval = 'WaitingExternalApproval',
  Draft = 'Draft',
  Booked = 'Booked',
  AtPartnerLocation = 'AtPartnerLocation',
  InTransit = 'InTransit',
  ArrivedAtFinalLocation = 'ArrivedAtFinalLocation',
  Processing = 'Processing',
  Accepted = 'Accepted',
  PartiallyAccepted = 'PartiallyAccepted',
  Refused = 'Refused',
  Cancelled = 'Cancelled',
}

export type ReturnWorkflowStep = {
  isCompleted: boolean;
  sort: number;
  status: { code: ReturnWorkflowStatus };
  statusDateUTC?: string;
};

export type ReturnWorkflow = ReturnWorkflowStep[];

export type GetReturnWorkflow = (
  returnId: Return['id'],
  config?: Config,
) => Promise<ReturnWorkflowStep>;
