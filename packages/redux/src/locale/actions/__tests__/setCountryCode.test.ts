import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE_LOCALE } from '../../reducer.js';
import { mockCountryCode } from 'tests/__fixtures__/locale/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { setCountryCode } from '../index.js';

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
