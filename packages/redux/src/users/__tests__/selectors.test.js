import * as fromEntities from '../../entities/selectors/entity';
import * as fromUsers from '../reducer';
import * as selectors from '../selectors';
import { expectedBenefitsNormalizedPayload } from '../__fixtures__/benefits.fixtures';
import { expectedCreditMovementsNormalizedPayload } from '../__fixtures__/creditMovements.fixtures';
import { expectedCreditNormalizedPayload } from '../__fixtures__/credit.fixtures';
import { expectedGetContactsNormalized } from '../__fixtures__/contacts.fixtures';
import { expectedNormalizedPayload } from '../__fixtures__/users.fixtures';
import { expectedPreferencesNormalizedPayload } from '../__fixtures__/preferences.fixtures';
import {
  expectedTitlesNormalizedPayload,
  idTitle1,
} from '../__fixtures__/titles.fixtures';
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
    },
    entities: {
      ...expectedNormalizedPayload.entities,
      ...expectedBenefitsNormalizedPayload.entities,
      ...expectedPreferencesNormalizedPayload.entities,
      ...expectedTitlesNormalizedPayload.entities,
      ...expectedCreditNormalizedPayload.entities,
      ...expectedCreditMovementsNormalizedPayload.entities,
      ...expectedGetContactsNormalized.entities,
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

      expect(selectors.getUsersError(mockState)).toEqual('error: not loaded');
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
      'Benefits',
      'Preferences',
      'Titles',
      'Credit',
      'CreditMovements',
      'Contacts',
    ];

    describe('sub-areas loading selectors', () => {
      selectorAssertions.assertSubAreasLoadingSelector(
        subAreaNames,
        mockState,
        selectors,
      );
    });

    describe('sub-areas error selectors', () => {
      selectorAssertions.assertSubAreasErrorSelector(
        subAreaNames,
        mockState,
        'users',
        selectors,
      );
    });
  });

  describe('getBenefits()', () => {
    it('should get the benefits from state', () => {
      const expectedResult = mockState.entities.benefits;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getBenefits(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'benefits');
    });
  });

  describe('getPreferences()', () => {
    it('should get the preferences from state', () => {
      const expectedResult = mockState.entities.preferences;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getPreferences(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'preferences');
    });
  });

  describe('isPreferencesLoading()', () => {
    it('should get the preferences loading property from state', () => {
      expect(selectors.isPreferencesLoading(mockState)).toEqual(false);
    });
  });

  describe('isUpdatingPreferences()', () => {
    it('should get the update preferences loading property from state', () => {
      expect(selectors.isUpdatingPreferences(mockState)).toEqual(false);
    });
  });

  describe('getUpdatePreferencesError()', () => {
    it('should get the preferences error property from state', () => {
      expect(selectors.getUpdatePreferencesError(mockState)).toEqual(
        mockState.users.updatePreferences.error,
      );
    });
  });

  describe('getTitles()', () => {
    it('should get the titles from state', () => {
      const expectedResult = mockState.entities.titles;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getTitles(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'titles');
    });
  });

  describe('getTitleById()', () => {
    it('should get a specific title from entity "titles"', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      const title = {
        id: idTitle1,
        value: 'title1',
      };

      expect(selectors.getTitleById(mockState, idTitle1)).toEqual(title);
      expect(spy).toHaveBeenCalledWith(mockState, 'titles', idTitle1);
    });
  });

  describe('getCredit()', () => {
    it('should get the credit balance from state', () => {
      const expectedResult = mockState.entities.credit;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getCredit(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'credit');
    });
  });

  describe('getCreditMovements()', () => {
    it('should get the credit movements from state', () => {
      const expectedResult = mockState.entities.creditMovements;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getCreditMovements(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'creditMovements');
    });
  });

  describe('getContacts()', () => {
    it('should get the contacts from state', () => {
      const expectedResult = mockState.entities.contacts;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getContacts(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'contacts');
    });
  });
});
