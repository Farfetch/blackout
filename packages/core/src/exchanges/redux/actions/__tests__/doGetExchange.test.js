import { exchangeId, responses } from '../../__fixtures__/exchanges.fixtures';
import { mockStore } from '../../../../../tests';
import doGetExchange from '../../actions/doGetExchange';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: reducer() }, state);

describe('doGetExchange() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const getExchange = jest.fn();
  const action = doGetExchange(getExchange);

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the get exchange request fails', async () => {
    const expectedError = new Error('get exchange error');

    getExchange.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(exchangeId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getExchange).toHaveBeenCalledTimes(1);
      expect(getExchange).toHaveBeenCalledWith(exchangeId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_EXCHANGE_REQUEST },
          {
            type: actionTypes.GET_EXCHANGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get exchange procedure is successful', async () => {
    getExchange.mockResolvedValueOnce(responses.getExchange.success);

    await store.dispatch(action(exchangeId));

    const actionResults = store.getActions();

    expect(getExchange).toHaveBeenCalledTimes(1);
    expect(getExchange).toHaveBeenCalledWith(exchangeId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_EXCHANGE_REQUEST },
      {
        payload: responses.getExchange.success,
        type: actionTypes.GET_EXCHANGE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_EXCHANGE_SUCCESS,
      }),
    ).toMatchSnapshot('get exchange success payload');
  });
});
