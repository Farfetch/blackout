import { mockStore } from '../../../../../tests';
import { requestData, responses } from '../../__fixtures__/exchanges.fixtures';
import doCreateExchange from '../../actions/doCreateExchange';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const exchangesMockStore = (state = {}) =>
  mockStore({ exchanges: reducer() }, state);

describe('doCreateExchange() action creator', () => {
  const expectedConfig = undefined;
  let store;

  const postExchange = jest.fn();
  const action = doCreateExchange(postExchange);
  const data = { ...requestData.postExchange };

  beforeEach(() => {
    jest.clearAllMocks();
    store = exchangesMockStore();
  });

  it('should create the correct actions when the create exchange request fails', async () => {
    const expectedError = new Error('create exchange error');

    postExchange.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(data));
    } catch (error) {
      expect(error).toBe(expectedError);
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
    }
  });

  it('should create the correct actions for when the create exchange procedure is successful', async () => {
    postExchange.mockResolvedValueOnce(responses.postExchange.success);

    await store.dispatch(action(data));

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
