import * as actionTypes from '../../actionTypes';
import {
  creditId,
  expectedCreditMovementsNormalizedPayload,
  mockGetCreditMovementsResponse,
  creditMovementsQuery as query,
} from 'tests/__fixtures__/users';
import { fetchUserCreditMovements } from '..';
import { getUserCreditMovements } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getUserCreditMovements: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchUserCreditMovements() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get user credit movements procedure fails', async () => {
    const expectedError = new Error('get user credit movements error');

    (getUserCreditMovements as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await fetchUserCreditMovements(creditId, query)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(getUserCreditMovements).toHaveBeenCalledTimes(1);
    expect(getUserCreditMovements).toHaveBeenCalledWith(
      creditId,
      query,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_REQUEST },
        {
          type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get user credit movements procedure is successful', async () => {
    (getUserCreditMovements as jest.Mock).mockResolvedValueOnce(
      mockGetCreditMovementsResponse,
    );

    await fetchUserCreditMovements(creditId, query)(store.dispatch);

    const actionResults = store.getActions();

    expect(getUserCreditMovements).toHaveBeenCalledTimes(1);
    expect(getUserCreditMovements).toHaveBeenCalledWith(
      creditId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_REQUEST },
      {
        payload: expectedCreditMovementsNormalizedPayload,
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_USER_CREDIT_MOVEMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('get user credit movements success payload');
  });
});
