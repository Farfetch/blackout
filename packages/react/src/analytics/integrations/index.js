import { integrations } from '@farfetch/blackout-analytics';

const { Integration } = integrations;

export { Integration };

export { default as AnalyticsService } from './AnalyticsService';
export { default as GA, validationSchemaBuilder } from './GA';
export { default as GTM } from './GTM';
export { default as Castle } from './Castle';
export { default as Vitorino } from './Vitorino';
export { default as GA4 } from './GA4';
export { default as Omnitracking } from './Omnitracking';
