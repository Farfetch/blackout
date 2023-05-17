import { schema } from 'normalizr';
import type { MerchantLocationEntity } from '../types/index.js';

const merchantsLocations = new schema.Entity<MerchantLocationEntity>(
  'merchantsLocations',
);

export default merchantsLocations;
