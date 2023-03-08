import {
  expectedBenefitsNormalizedPayload,
  expectedCreditMovementsNormalizedPayload,
  expectedCreditNormalizedPayload,
  expectedGetAddressesNormalizedPayload,
  expectedGetContactsNormalized,
  expectedNormalizedUserPayload,
  expectedPreferencesNormalizedPayload,
  expectedTitlesNormalizedPayload,
} from 'tests/__fixtures__/users/index.mjs';
import { INITIAL_STATE } from '../reducer.js';
import type { StoreState } from '../../types/index.js';

export const userId = 29538482;
export const mockBaseState: NonNullable<StoreState> = {
  users: INITIAL_STATE,
  entities: {
    ...expectedNormalizedUserPayload.entities,
    ...expectedBenefitsNormalizedPayload.entities,
    ...expectedPreferencesNormalizedPayload.entities,
    ...expectedTitlesNormalizedPayload.entities,
    ...expectedCreditNormalizedPayload,
    ...expectedCreditMovementsNormalizedPayload,
    ...expectedGetContactsNormalized.entities,
    ...expectedGetAddressesNormalizedPayload.entities,
  },
};
