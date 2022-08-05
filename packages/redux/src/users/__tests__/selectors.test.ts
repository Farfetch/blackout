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
} from 'tests/__fixtures__/users';

describe('users redux selectors', () => {
  const userId = '29538482';
  const mockState = {
    users: {
      error: 'error: not loaded',
      result: userId,
      isLoading: false,
      benefits: {
        error: 'error: not loaded',
        isLoading: false,
      },
      preferences: {
        error: 'error: not loaded',
        isLoading: false,
      },
      updatePreferences: {
        error: 'error: not loaded',
        isLoading: false,
      },
      titles: {
        error: 'error: not loaded',
        isLoading: false,
      },
      credits: {
        error: 'error: not loaded',
        isLoading: false,
      },
      creditMovements: {
        error: 'error: not loaded',
        isLoading: false,
      },
      contacts: {
        error: 'error: not loaded',
        isLoading: false,
      },
      attributes: {
        result: null,
        error: 'error: not loaded',
        isLoading: false,
      },
      addresses: {
        error: 'error: not loaded',
        result: null,
        isLoading: false,
        address: {
          error: {
            [addressId2]: 'error: not loaded',
          },
          isLoading: {
            [addressId2]: false,
          },
        },
        /* Used for operations related with the default address that
          have a result associated, such as getting the default contact address */
        defaultAddressDetails: {
          error: 'error: not loaded',
          isLoading: false,
          result: null,
        },
      },
    },
    entities: {
      user: {
        ...expectedNormalizedUserPayload.entities,
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

      expect(selectors.isUserLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('getUserError()', () => {
    it('should get the users error property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getError');

      expect(selectors.getUserError(mockState)).toEqual('error: not loaded');
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });
});
