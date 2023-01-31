import { actionTypes } from '../..';
import { doSetCountry } from '../';
import { mockCountryCode } from 'tests/__fixtures__/locale';
import { mockStore } from '../../../../../tests';

describe('doSetCountry() action creator', () => {
  let store;

  beforeEach(jest.clearAllMocks);

  it('should dispatch the correct action type', () => {
    store = mockStore();
    store.dispatch(doSetCountry(mockCountryCode));

    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_COUNTRY,
        payload: { countryCode: mockCountryCode },
      },
    ]);
  });
});
