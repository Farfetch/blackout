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
      credit: {
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
      userAttributes: {
        result: null,
        error: 'error: not loaded',
        isLoading: false,
      },
      addresses: {
        error: 'error: not loaded',
        isLoading: false,
      },
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
      defaultAddress: {
        error: 'error: not loaded',
        isLoading: false,
        result: null,
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

  describe('areUsersLoading()', () => {
    it('should get the users loading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getIsLoading');

      expect(selectors.areUsersLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('getUsersError()', () => {
    it('should get the users error property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getError');

      expect(selectors.getUserError(mockState)).toEqual('error: not loaded');
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('getUserId()', () => {
    it('should get the user id property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getResult');

      expect(selectors.getUserId(mockState)).toEqual(userId);
      expect(spy).toHaveBeenCalledWith(mockState.users);
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'UserBenefits',
      'UserPreferences',
      'UserTitles',
      'UserCredit',
      'UserCreditMovements',
      'UserContacts',
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
        'UserCredit',
        'UserCreditMovements',
        'UserContacts',
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

  describe('isUserPreferencesLoading()', () => {
    it('should get the preferences loading property from state', () => {
      expect(selectors.isUserPreferencesLoading(mockState)).toEqual(false);
    });
  });

  describe('isUserPreferencesUpdating()', () => {
    it('should get the update preferences loading property from state', () => {
      expect(selectors.isUserPreferencesUpdating(mockState)).toEqual(false);
    });
  });

  describe('getUserPreferencesError()', () => {
    it('should get the preferences error property from state', () => {
      expect(selectors.getUserPreferencesError(mockState)).toEqual(
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

  describe('getUserCredit()', () => {
    it('should get the credit balance from state', () => {
      const expectedResult = mockState.entities.credit;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserCredit(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'credit');
    });
  });

  describe('getUserCreditMovements()', () => {
    it('should get the credit movements from state', () => {
      const expectedResult = mockState.entities.creditMovements;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserCreditMovements(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'creditMovements');
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

  describe('isUserAttributesLoading()', () => {
    it('should get the user attributes loading property from state', () => {
      expect(selectors.isUserAttributesLoading(mockState)).toEqual(false);
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

  describe('getUserAddresses()', () => {
    it('should get the addresses from state', () => {
      const expectedResult = mockState.entities.addresses;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getUserAddresses(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses');
    });

    it('should get the addresses error property from state', () => {
      const expectedResult = mockState.users.addresses.error;
      const spy = jest.spyOn(fromUsers, 'getUserAddresses');

      expect(selectors.getUserAddressesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the addresses isLoading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getUserAddresses');

      expect(selectors.isUserAddressesLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
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
      const spy = jest.spyOn(fromUsers, 'getUserAddress');

      expect(selectors.isUserAddressLoading(mockState, addressId2)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address error property from state', () => {
      const expectedResult = mockState.users.address.error[addressId2];
      const spy = jest.spyOn(fromUsers, 'getUserAddress');

      expect(selectors.getUserAddressError(mockState, addressId2)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserDefaultAddress()', () => {
    it('should get the default address details isLoading property from state', () => {
      const spy = jest.spyOn(fromUsers, 'getUserDefaultAddressDetails');

      expect(selectors.isUserDefaultAddressLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details error property from state', () => {
      const expectedResult = mockState.users.defaultAddress.error;
      const spy = jest.spyOn(fromUsers, 'getUserDefaultAddressDetails');

      expect(selectors.getUserDefaultAddressError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details result property', () => {
      const spy = jest.spyOn(fromUsers, 'getUserDefaultAddressDetails');
      const expectedResult = mockState.users.defaultAddress.result;

      expect(selectors.getUserDefaultAddressResult(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
