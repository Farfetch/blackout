import type { UserAttribute } from './userAttribute.types';

export type UserAttributeData = Omit<UserAttribute, 'id' | 'tenantId'>;
