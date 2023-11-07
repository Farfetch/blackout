import * as actionTypes from '../../actionTypes.js';
import { exchangeId, responses } from 'tests/__fixtures__/exchanges/index.mjs';
import { fetchExchange } from '../index.js';
import { find } from 'lodash-es';
import { getExchange } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getExchange: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: INITIAL_STATE }, state);

describe('fetchExchange() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the fetch exchange procedure fails', async () => {
    const expectedError = new Error('fetch exchange error');

    (getExchange as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await fetchExchange(exchangeId)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getExchange).toHaveBeenCalledTimes(1);
    expect(getExchange).toHaveBeenCalledWith(exchangeId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_EXCHANGE_REQUEST },
        {
          type: actionTypes.FETCH_EXCHANGE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the fetch exchange procedure is successful', async () => {
    (getExchange as jest.Mock).mockResolvedValueOnce(
      responses.getExchange.success,
    );

    await fetchExchange(exchangeId)(store.dispatch);

    const actionResults = store.getActions();

    expect(getExchange).toHaveBeenCalledTimes(1);
    expect(getExchange).toHaveBeenCalledWith(exchangeId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_EXCHANGE_REQUEST },
      {
        payload: responses.getExchange.success,
        type: actionTypes.FETCH_EXCHANGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_EXCHANGE_SUCCESS,
      }),
    ).toMatchSnapshot('fetch exchange success payload');
  });
});
