import { schema } from 'normalizr';
import type { DraftOrderEntity } from '../index.js';

export default new schema.Entity<DraftOrderEntity>('draftOrders');
