import * as actionTypes from '../../actionTypes';
import { mockCountryCode } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import { setCountryCode } from '..';

describe('setCountry() action creator', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(setCountryCode(mockCountryCode));

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_COUNTRY_CODE,
        payload: { countryCode: mockCountryCode },
      },
    ]);
  });
});
