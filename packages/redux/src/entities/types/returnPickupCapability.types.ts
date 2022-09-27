import type { ReturnPickupCapability } from '@farfetch/blackout-client';

export type ReturnPickupScheduleAdapted = {
  start: number;
  end: number;
};

export type ReturnPickupCapabilityEntity = Omit<
  ReturnPickupCapability,
  'availableTimeSlots'
> & {
  availableTimeSlots: ReturnPickupScheduleAdapted[];
};
