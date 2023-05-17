import type { AxiosInstance } from 'axios';
import type { ConfigureOptions, createRequestToken } from '@castleio/castle-js';
import type { IntegrationOptions } from '@farfetch/blackout-analytics';

export interface CastleIntegrationOptions extends IntegrationOptions {
  configureOptions: ConfigureOptions;
  debugModeOn?: boolean;
  httpClient?: AxiosInstance;
  clientIdHeaderName?: string;
  configureHttpClient?: (
    tokenCreator: typeof createRequestToken,
  ) => Promise<void>;
}

export type CastleEventData = {
  event: string;
  type: string;
} & Record<string, unknown>;
