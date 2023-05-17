import type { SeoPageType } from '@farfetch/blackout-client';

export type GenerateSEOPathnameQuery = {
  // The pathname of the location.
  path?: string;
  // The type of the page (pages|stories...).
  pageType?: SeoPageType;
};
