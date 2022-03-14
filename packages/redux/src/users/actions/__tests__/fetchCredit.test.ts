import { actionTypes } from '../..';
import {
  expectedCreditNormalizedPayload,
  mockGetCreditResponse,
} from 'tests/__fixtures__/users';
import { fetchCredit } from '..';
import { getCredit } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getCredit: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchCredit action creator', () => {
  const id = 123456;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get credit procedure fails', async () => {
    const expectedError = new Error('get credit error');

    (getCredit as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCredit(id));
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
    (getCredit as jest.Mock).mockResolvedValueOnce(mockGetCreditResponse);

    await store.dispatch(fetchCredit(id));

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
    (getCredit as jest.Mock).mockResolvedValueOnce([]);

    await store.dispatch(fetchCredit(id));

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
