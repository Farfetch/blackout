import type { UserAttribute } from './userAttribute.types.js';

export type UserAttributeData = Omit<UserAttribute, 'id' | 'tenantId'>;
