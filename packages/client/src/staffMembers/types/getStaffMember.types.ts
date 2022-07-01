import type { Config } from '../..';
import type { StaffMember } from './staffMember.types';

export type GetStaffMember = (
  id: StaffMember['id'],
  config?: Config,
) => Promise<StaffMember>;
