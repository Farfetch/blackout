import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromProfile from '../reducer';
import * as selectors from '../selectors';
import { expectedBenefitsNormalizedPayload } from '../__fixtures__/benefits.fixtures';
import { expectedCreditMovementsNormalizedPayload } from '../__fixtures__/creditMovements.fixtures';
import { expectedCreditNormalizedPayload } from '../__fixtures__/credit.fixtures';
import { expectedGetContactsNormalized } from '../__fixtures__/contacts.fixtures';
import { expectedNormalizedPayload } from '../__fixtures__/profile.fixtures';
import { expectedPreferencesNormalizedPayload } from '../__fixtures__/preferences.fixtures';
import {
  expectedTitlesNormalizedPayload,
  idTitle1,
} from '../__fixtures__/titles.fixtures';
import { selectorAssertions } from '../../../../tests/helpers';

describe('profile redux selectors', () => {
  const profileId = '29538482';
  const mockState = {
    profile: {
      error: 'error: not loaded',
      result: profileId,
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

  describe('isProfileLoading()', () => {
    it('should get the profile loading property from state', () => {
      const spy = jest.spyOn(fromProfile, 'getIsLoading');

      expect(selectors.isProfileLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.profile);
    });
  });

  describe('getProfileError()', () => {
    it('should get the profile error property from state', () => {
      const spy = jest.spyOn(fromProfile, 'getError');

      expect(selectors.getProfileError(mockState)).toEqual('error: not loaded');
      expect(spy).toHaveBeenCalledWith(mockState.profile);
    });
  });

  describe('getProfileId()', () => {
    it('should get the profile id property from state', () => {
      const spy = jest.spyOn(fromProfile, 'getResult');

      expect(selectors.getProfileId(mockState)).toEqual(profileId);
      expect(spy).toHaveBeenCalledWith(mockState.profile);
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
        'profile',
        selectors,
      );
    });
  });

  describe('getBenefits()', () => {
    it('should get the benefits from state', () => {
      const expectedResult = mockState.entities.benefits;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getBenefits(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'benefits');
    });
  });

  describe('getPreferences()', () => {
    it('should get the preferences from state', () => {
      const expectedResult = mockState.entities.preferences;
      const spy = jest.spyOn(fromEntities, 'getEntity');

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
        mockState.profile.updatePreferences.error,
      );
    });
  });

  describe('getTitles()', () => {
    it('should get the titles from state', () => {
      const expectedResult = mockState.entities.titles;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getTitles(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'titles');
    });
  });

  describe('getTitleById()', () => {
    it('should get a specific title from entity "titles"', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

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
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCredit(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'credit');
    });
  });

  describe('getCreditMovements()', () => {
    it('should get the credit movements from state', () => {
      const expectedResult = mockState.entities.creditMovements;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getCreditMovements(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'creditMovements');
    });
  });

  describe('getContacts()', () => {
    it('should get the contacts from state', () => {
      const expectedResult = mockState.entities.contacts;
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getContacts(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'contacts');
    });
  });
});
