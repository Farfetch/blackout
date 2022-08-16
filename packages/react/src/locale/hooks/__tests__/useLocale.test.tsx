import { cleanup, renderHook } from '@testing-library/react';
import {
  mockCountriesEntities,
  mockCountry,
  mockCountryNormalized,
  mockLocaleState,
} from 'tests/__fixtures__/locale';
import { withStore } from '../../../../tests/helpers';
import useLocale from '../useLocale';
import type { StoreState } from '@farfetch/blackout-redux';

const stateMockData: StoreState = {
  ...mockLocaleState,
  entities: {
    countries: mockCountriesEntities,
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCountryStateCities: jest.fn(() => () => Promise.resolve()),
}));

describe('useLocale', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useLocale(), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      data: {
        subfolder: mockCountry.defaultSubfolder.replace('/', ''),
        countryCultureCode: mockCountry.defaultCulture,
        countryCode: mockCountry.code,
        country: mockCountryNormalized,
        sourceCountryCode: mockLocaleState.locale.sourceCountryCode,
        currency: mockCountry.currencies[0],
      },
    });
  });
});
