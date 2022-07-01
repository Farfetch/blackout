import * as fromEntities from '../../entities/selectors/entity';
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
  idTitle1,
} from 'tests/__fixtures__/users';
import { selectorAssertions } from '../../../tests/helpers';

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

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'UserBenefits',
      'UserPreferences',
      'UserTitles',
      'UserCredits',
      'UserCreditMovements',
      'UserContacts',
      'UserAddresses',
    ];

    describe('sub-areas loading selectors', () => {
      selectorAssertions.assertSubAreasLoadingSelector(
        subAreaNames,
        mockState,
        selectors,
      );
    });

    describe('sub-areas error selectors', () => {
      const propertyNames = [
        'UserBenefits',
        'UserPreferences',
        'UserTitles',
        'UserCredits',
        'UserCreditMovements',
        'UserContacts',
        'UserAddresses',
      ];

      const getSelectorSubAreaName = (subArea: string) => {
        return subArea.charAt(0).toLowerCase() + subArea.slice(1);
      };

      it.each(propertyNames)('should handle get%sError selector', subArea => {
        const selectorName = `get${subArea}Error`;
        const replacedSubArea = subArea.replace('User', '');
        const reducerSubAreaName = getSelectorSubAreaName(replacedSubArea);
        const expectedResult = mockState['users'][reducerSubAreaName].error;

        expect(selectors[selectorName](mockState)).toBe(expectedResult);
      });
    });
  });

  describe('getUserBenefits()', () => {
    it('should get the benefits from state', () => {
      const expectedResult = mockState.entities.benefits;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserBenefits(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'benefits');
    });
  });

  describe('getUserPreferences()', () => {
    it('should get the preferences from state', () => {
      const expectedResult = mockState.entities.preferences;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserPreferences(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'preferences');
    });
  });

  describe('areUserPreferencesUpdating()', () => {
    it('should get the update preferences loading property from state', () => {
      expect(selectors.areUserPreferencesUpdating(mockState)).toEqual(false);
    });
  });

  describe('getUserPreferencesUpdateError()', () => {
    it('should get the preferences error property from state', () => {
      expect(selectors.getUserPreferencesUpdateError(mockState)).toEqual(
        mockState.users.updatePreferences.error,
      );
    });
  });

  describe('getUserTitles()', () => {
    it('should get the titles from state', () => {
      const expectedResult = mockState.entities.titles;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserTitles(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'titles');
    });
  });

  describe('getUserTitleById()', () => {
    it('should get a specific title from entity "titles"', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      const title = {
        id: idTitle1,
        value: 'title1',
      };

      expect(selectors.getUserTitleById(mockState, idTitle1)).toEqual(title);
      expect(spy).toHaveBeenCalledWith(mockState, 'titles', idTitle1);
    });
  });

  describe('getUserContacts()', () => {
    it('should get the contacts from state', () => {
      const expectedResult = mockState.entities.contacts;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserContacts(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'contacts');
    });
  });

  describe('areUserAttributesLoading()', () => {
    it('should get the user attributes loading property from state', () => {
      expect(selectors.areUserAttributesLoading(mockState)).toEqual(false);
    });
  });

  describe('getUserAttributes()', () => {
    it('should get the user attributes result property from state', () => {
      expect(selectors.getUserAttributes(mockState)).toEqual(null);
    });
  });

  describe('getUserAttributesError()', () => {
    it('should get the user attributes error property from state', () => {
      expect(selectors.getUserAttributesError(mockState)).toEqual(
        mockState.users.updatePreferences.error,
      );
    });
  });

  describe('getUserAddressesResult()', () => {
    it('should get the result property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getAddresses');
      expect(selectors.getUserAddressesResult(mockState)).toEqual(
        mockState.users.addresses.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('getUserAddresses()', () => {
    it('should get the addresses from state', () => {
      const expectedResult = mockState.entities.addresses;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserAddresses(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses');
    });
  });

  describe('getUserAddress()', () => {
    it('should get the specified address from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getUserAddress(mockState, addressId2)).toEqual(
        expectedGetAddressesNormalizedPayload.entities.addresses[addressId2],
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses', addressId2);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getAddresses');

      expect(selectors.isUserAddressLoading(mockState, addressId2)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address error property from state', () => {
      const expectedResult =
        mockState.users.addresses.address.error[addressId2];
      const spy = jest.spyOn(fromUsers, 'getAddresses');

      expect(selectors.getUserAddressError(mockState, addressId2)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserDefaultAddress()', () => {
    it('should get the default address details isLoading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getAddresses');

      expect(selectors.isUserDefaultAddressDetailsLoading(mockState)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details error property from state', () => {
      const expectedResult =
        mockState.users.addresses.defaultAddressDetails.error;
      const spy = jest.spyOn(fromUsers, 'getAddresses');

      expect(selectors.getUserDefaultAddressDetailsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details result property', () => {
      const spy = jest.spyOn(fromUsers, 'getAddresses');
      const expectedResult =
        mockState.users.addresses.defaultAddressDetails.result;

      expect(selectors.getUserDefaultAddressDetailsResult(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
