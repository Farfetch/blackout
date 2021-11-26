import { actionTypes } from '../..';
import { fetchCharges } from '..';
import { getCharges } from '@farfetch/blackout-client/payments';
import { INITIAL_STATE } from '../../reducer';
import { mockCharges } from 'tests/__fixtures__/checkout';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-client/payments'),
  getCharges: jest.fn(),
}));

describe('fetchCharges() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const intentId = 12345;
  const chargeId = '5c2855d7-f1c0-4d2a-8ce4-5bf7c37f0dc7';
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the charge procedure fails', async () => {
    const expectedError = new Error('charges error');

    getCharges.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCharges(intentId, chargeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCharges).toHaveBeenCalledTimes(1);
      expect(getCharges).toHaveBeenCalledWith(
        intentId,
        chargeId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CHARGES_REQUEST },
          {
            type: actionTypes.FETCH_CHARGES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the charge procedure is successful', async () => {
    getCharges.mockResolvedValueOnce(mockCharges);
    await store.dispatch(fetchCharges(intentId, chargeId));

    const actionResults = store.getActions();

    expect(getCharges).toHaveBeenCalledTimes(1);
    expect(getCharges).toHaveBeenCalledWith(intentId, chargeId, expectedConfig);

    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CHARGES_REQUEST },
      {
        type: actionTypes.FETCH_CHARGES_SUCCESS,
        payload: mockCharges,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CHARGES_SUCCESS,
      }),
    ).toMatchSnapshot('charge success payload');
  });
});
