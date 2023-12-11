import getMetatag from './getMetatag.js';
import type { SEOMetadata } from '@farfetch/blackout-client/src/contents/types/seoMetadata.types.js';

const generateSchemaOrgProperty = (property: string, metadata: SEOMetadata) =>
  getMetatag(property, metadata?.metatags);

export default generateSchemaOrgProperty;
