import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE_LOCALE } from '../../reducer';
import { mockCountryCode } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../tests';
import { setCountryCode } from '..';

describe('setCountry() action creator', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore({ bag: INITIAL_STATE_LOCALE }, {});
    setCountryCode(mockCountryCode)(store.dispatch);

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_COUNTRY_CODE,
        payload: { countryCode: mockCountryCode },
      },
    ]);
  });
});
