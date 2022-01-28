export type PickupCapabilities = {
  availableTimeSlots: TimeSlots[];
};

export type TimeSlots = {
  start: string;
  end: string;
};
