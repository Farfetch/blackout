import { actionTypes } from '../..';
import { fetchPersonalId } from '../';
import { getPersonalId } from '@farfetch/blackout-client/users';
import { INITIAL_STATE } from '../../reducer';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  getPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('fetchPersonalId action creator', () => {
  let store = usersMockStore();
  const userId = 123456789;
  const personalId = '123456';
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the fetch personal id procedure fails', async () => {
    const expectedError = new Error('fetch personal id error');

    (getPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchPersonalId(userId, personalId, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPersonalId).toHaveBeenCalledTimes(1);
      expect(getPersonalId).toHaveBeenCalledWith(
        userId,
        personalId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.FETCH_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the fetch personal id procedure is successful', async () => {
    (getPersonalId as jest.Mock).mockResolvedValueOnce(mockPersonalIdResponse);

    await store.dispatch(fetchPersonalId(userId, personalId, config));

    const actionResults = store.getActions();

    expect(getPersonalId).toHaveBeenCalledTimes(1);
    expect(getPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.FETCH_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('fetch personal id success payload');
  });
});
