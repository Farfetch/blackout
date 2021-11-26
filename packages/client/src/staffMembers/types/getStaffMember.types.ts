import type { StaffMember } from './staffMember.types';

export type GetStaffMember = (
  id: StaffMember['id'],
  config?: Record<string, unknown>,
) => Promise<StaffMember>;
