import type {
  EventContext,
  IntegrationOptions,
} from '@farfetch/blackout-analytics';

export type EventsMapper = Record<
  string,
  string | Array<string | undefined> | undefined
>;

export type VitorinoTrackCallback = ((page?: string) => void) | null;

type Fields = { sensitiveFields?: string[]; secretFields?: string[] };
type Network = { proxy: string; path: string };
type Environment = string;

export type Config = {
  correlationId: string;
  tenantId: EventContext['tenantId'];
  clientId: EventContext['clientId'];
  origin: string;
  customerId: string;
  environment: Environment;
  fields?: Fields;
  network: Network;
};

export interface VitorinoIntegrationOptions extends IntegrationOptions {
  eventsMapper?: () => EventsMapper;
  environment?: Environment;
  sensitiveFields?: Fields['sensitiveFields'];
  secretFields?: Fields['secretFields'];
  devScriptSource?: string;
  network?: Network;
}
