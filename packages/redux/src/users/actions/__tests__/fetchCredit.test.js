import {
  expectedCreditNormalizedPayload,
  mockGetCreditResponse,
} from '../../__fixtures__/credit.fixtures';
import { fetchCredit } from '..';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const usersMockStore = (state = {}) => mockStore({ users: reducer() }, state);
const expectedConfig = undefined;
let store;

describe('fetchCredit action creator', () => {
  const getCredit = jest.fn();
  const action = fetchCredit(getCredit);
  const id = '123456';

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get credit procedure fails', async () => {
    const expectedError = new Error('get credit error');

    getCredit.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(id));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCredit).toHaveBeenCalledTimes(1);
      expect(getCredit).toHaveBeenCalledWith(id, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CREDIT_REQUEST },
          {
            type: actionTypes.FETCH_CREDIT_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get credit procedure is successful', async () => {
    getCredit.mockResolvedValueOnce(mockGetCreditResponse);

    await store.dispatch(action(id));

    const actionResults = store.getActions();

    expect(getCredit).toHaveBeenCalledTimes(1);
    expect(getCredit).toHaveBeenCalledWith(id, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CREDIT_REQUEST },
      {
        payload: expectedCreditNormalizedPayload,
        type: actionTypes.FETCH_CREDIT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CREDIT_SUCCESS,
      }),
    ).toMatchSnapshot('get credit success payload');
  });

  it('should create the correct actions for when the get credit procedure is successful with empty data', async () => {
    getCredit.mockResolvedValueOnce([]);

    await store.dispatch(action(id));

    const actionResults = store.getActions();

    expect(getCredit).toHaveBeenCalledTimes(1);
    expect(getCredit).toHaveBeenCalledWith(id, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CREDIT_REQUEST },
      {
        payload: {
          credit: {
            currency: null,
            formattedValue: null,
            value: 0,
          },
        },
        type: actionTypes.FETCH_CREDIT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CREDIT_SUCCESS,
      }),
    ).toMatchSnapshot('get credit success payload with empty data');
  });
});
