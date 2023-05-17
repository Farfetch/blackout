import type { ReturnPickupSchedule } from './return.types.js';

export type ReturnPickupCapability = {
  availableTimeSlots: ReturnPickupSchedule[];
};
