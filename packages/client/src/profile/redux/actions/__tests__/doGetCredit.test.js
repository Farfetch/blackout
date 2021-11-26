import {
  expectedCreditNormalizedPayload,
  mockGetCreditResponse,
} from '../../__fixtures__/credit.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCredit from '../doGetCredit';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doGetCredit action creator', () => {
  const getCredit = jest.fn();
  const action = doGetCredit(getCredit);
  const id = '123456';

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
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
          { type: actionTypes.GET_CREDIT_REQUEST },
          {
            type: actionTypes.GET_CREDIT_FAILURE,
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
      { type: actionTypes.GET_CREDIT_REQUEST },
      {
        payload: expectedCreditNormalizedPayload,
        type: actionTypes.GET_CREDIT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CREDIT_SUCCESS,
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
      { type: actionTypes.GET_CREDIT_REQUEST },
      {
        payload: {
          credit: {
            currency: null,
            formattedValue: null,
            value: 0,
          },
        },
        type: actionTypes.GET_CREDIT_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CREDIT_SUCCESS,
      }),
    ).toMatchSnapshot('get credit success payload with empty data');
  });
});
