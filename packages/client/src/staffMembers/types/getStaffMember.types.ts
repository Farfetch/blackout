import type { Config } from '../../index.js';
import type { StaffMember } from './staffMember.types.js';

export type GetStaffMember = (
  id: StaffMember['id'],
  config?: Config,
) => Promise<StaffMember>;
