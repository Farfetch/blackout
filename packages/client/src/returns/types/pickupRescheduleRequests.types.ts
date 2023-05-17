export enum RescheduleStatus {
  InProgress,
  Succeeded,
  Failed,
}

export type PickupRescheduleRequest = {
  id: string;
  timeWindow: {
    start: string;
    end: string;
  };
  status: RescheduleStatus;
};

export type PickupRescheduleRequests = PickupRescheduleRequest[];
