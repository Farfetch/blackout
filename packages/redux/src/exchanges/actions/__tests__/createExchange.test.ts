import * as actionTypes from '../../actionTypes.js';
import { createExchange } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import { postExchange } from '@farfetch/blackout-client';
import { requestData, responses } from 'tests/__fixtures__/exchanges/index.mjs';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postExchange: jest.fn(),
}));

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: INITIAL_STATE }, state);

describe('createExchange() action creator', () => {
  const expectedConfig = undefined;
  let store: ReturnType<typeof exchangesMockStore>;
  const data = requestData.postExchange;

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange procedure fails', async () => {
    const expectedError = new Error('create exchange error');

    (postExchange as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () => await createExchange(data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(postExchange).toHaveBeenCalledTimes(1);
    expect(postExchange).toHaveBeenCalledWith(data, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.CREATE_EXCHANGE_REQUEST },
        {
          type: actionTypes.CREATE_EXCHANGE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the create exchange procedure is successful', async () => {
    (postExchange as jest.Mock).mockResolvedValueOnce(
      responses.postExchange.success,
    );

    await createExchange(data)(store.dispatch);

    const actionResults = store.getActions();

    expect(postExchange).toHaveBeenCalledTimes(1);
    expect(postExchange).toHaveBeenCalledWith(data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_EXCHANGE_REQUEST },
      {
        type: actionTypes.CREATE_EXCHANGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_EXCHANGE_SUCCESS,
      }),
    ).toMatchSnapshot('create exchange success payload');
  });
});
