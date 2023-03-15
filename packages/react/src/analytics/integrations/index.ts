import { integrations } from '@farfetch/blackout-analytics';

const { Integration } = integrations;

export { Integration };

export { default as GA, validationSchemaBuilder } from './GA/index.js';
export { default as GTM } from './GTM/index.js';
export {
  default as Castle,
  CASTLE_CLIENT_ID_HEADER_NAME,
} from './Castle/index.js';
export { default as GA4 } from './GA4/index.js';
export { default as Omnitracking } from './Omnitracking/index.js';
export { default as Riskified } from './Riskified/index.js';
export { default as Forter } from './Forter/index.js';
