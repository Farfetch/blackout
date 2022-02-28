import type ConsentData from './consentData.types';

type EventData = {
  type: string;
  context: Record<string, unknown> | undefined;
  platform: string | undefined;
  consent: ConsentData;
  user: unknown;
  timestamp: number;
} & Record<string, unknown>;

export default EventData;
