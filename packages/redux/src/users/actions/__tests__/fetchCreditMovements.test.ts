import { actionTypes } from '../..';
import {
  expectedCreditMovementsNormalizedPayload,
  mockGetCreditMovementsResponse,
} from 'tests/__fixtures__/users';
import { fetchCreditMovements } from '..';
import { getUserCreditMovements } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getUserCreditMovements: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store = usersMockStore();

describe('fetchCreditMovements action creator', () => {
  const id = 123456;
  const query = {
    id,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the get credit movements procedure fails', async () => {
    const expectedError = new Error('get credit movements error');

    (getUserCreditMovements as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchCreditMovements(id, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getUserCreditMovements).toHaveBeenCalledTimes(1);
      expect(getUserCreditMovements).toHaveBeenCalledWith(
        id,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_CREDIT_MOVEMENTS_REQUEST },
          {
            type: actionTypes.FETCH_CREDIT_MOVEMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get credit movements procedure is successful', async () => {
    (getUserCreditMovements as jest.Mock).mockResolvedValueOnce(
      mockGetCreditMovementsResponse,
    );

    await store.dispatch(fetchCreditMovements(id, query));

    const actionResults = store.getActions();

    expect(getUserCreditMovements).toHaveBeenCalledTimes(1);
    expect(getUserCreditMovements).toHaveBeenCalledWith(
      id,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_CREDIT_MOVEMENTS_REQUEST },
      {
        payload: expectedCreditMovementsNormalizedPayload,
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_CREDIT_MOVEMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('get credit movements success payload');
  });
});
