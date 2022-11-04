import type { Config, QuerySearchContents } from '@farfetch/blackout-client';

export interface UseContentTypeOptions
  extends Omit<
      QuerySearchContents,
      'contentTypeCode' | 'spaceCode' | 'environmentCode'
    >,
    Partial<Pick<QuerySearchContents, 'spaceCode' | 'environmentCode'>> {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
}
