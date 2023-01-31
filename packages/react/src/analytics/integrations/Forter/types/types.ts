import type {
  IntegrationOptions,
  OmnitrackingRequestPayload,
  PageActionEvents,
} from '@farfetch/blackout-analytics';

export interface ForterIntegrationOptions extends IntegrationOptions {
  siteId: string;
  origin?: string;
  omnitrackingHttpClient?: (
    data: OmnitrackingRequestPayload<PageActionEvents>,
  ) => Promise<unknown>;
}
