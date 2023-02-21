import * as fromUsers from '../reducer';
import * as selectors from '../selectors';
import {
  addressId2,
  expectedBenefitsNormalizedPayload,
  expectedCreditMovementsNormalizedPayload,
  expectedCreditNormalizedPayload,
  expectedGetAddressesNormalizedPayload,
  expectedGetContactsNormalized,
  expectedNormalizedUserPayload,
  expectedPreferencesNormalizedPayload,
  expectedTitlesNormalizedPayload,
  mockUserInitialState,
} from 'tests/__fixtures__/users';
import type { BlackoutError } from '@farfetch/blackout-client';

describe('users redux selectors', () => {
  const userId = 29538482;
  const mockState = {
    users: {
      ...mockUserInitialState,
      error: new Error('error: not loaded') as BlackoutError,
      id: userId,
      isLoading: false,
      benefits: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      preferences: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      updatePreferences: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      titles: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      credits: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      creditMovements: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      contacts: {
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      attributes: {
        result: null,
        error: new Error('error: not loaded') as BlackoutError,
        isLoading: false,
      },
      addresses: {
        ...mockUserInitialState.addresses,
        error: new Error('error: not loaded') as BlackoutError,
        result: null,
        isLoading: false,
        address: {
          error: {
            [addressId2]: new Error('error: not loaded') as BlackoutError,
          },
          isLoading: {
            [addressId2]: false,
          },
        },
        /* Used for operations related with the default address that
          have a result associated, such as getting the default contact address */
        defaultAddressDetails: {
          error: new Error('error: not loaded') as BlackoutError,
          isLoading: false,
          result: null,
        },
      },
    },
    entities: {
      user: {
        ...expectedNormalizedUserPayload.entities.user,
        credit: {
          currency: 'GB',
          value: 50,
          formattedValue: '£50',
        },
        creditMovements: {
          entries: [
            {
              type: 1,
              value: 0.57,
              formattedValue: '$0.57',
              currency: 'USD',
              description: 'Other Reason (FF fault)',
              createdOn: '/Date(1581071861195)/',
            },
            {
              type: 2,
              value: 13.97,
              formattedValue: '$13.97',
              currency: 'USD',
              description: 'EUR 12.56 credit was Used - Order W95FWA',
              createdOn: '/Date(1579792756504)/',
            },
          ],
          number: 1,
          totalItems: 2,
          totalPages: 1,
        },
      },
      ...expectedBenefitsNormalizedPayload.entities,
      ...expectedPreferencesNormalizedPayload.entities,
      ...expectedTitlesNormalizedPayload.entities,
      ...expectedCreditNormalizedPayload,
      ...expectedCreditMovementsNormalizedPayload,
      ...expectedGetContactsNormalized.entities,
      ...expectedGetAddressesNormalizedPayload.entities,
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('isUserLoading()', () => {
    it('should get the users loading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getIsLoading');

      expect(selectors.isUserLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('getUserError()', () => {
    it('should get the users error property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getError');

      expect(selectors.getUserError(mockState)).toEqual(
        new Error('error: not loaded'),
      );
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });
});
