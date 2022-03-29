import { actionTypes } from '../..';
import { INITIAL_STATE } from '../../reducer';
import { mockPersonalIdResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../tests';
import { patchPersonalId } from '@farfetch/blackout-client/users';
import { updatePersonalId } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/users', () => ({
  ...jest.requireActual('@farfetch/blackout-client/users'),
  patchPersonalId: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('updatePersonalId action creator', () => {
  let store = usersMockStore();
  const userId = 123456;
  const personalId = '123456';
  const data = {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    idNumber: 'string',
    name: 'string',
  };
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

  it('should create the correct actions for when the update personal id procedure fails', async () => {
    const expectedError = new Error('update personal id error');

    (patchPersonalId as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updatePersonalId(userId, personalId, data, config));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchPersonalId).toHaveBeenCalledTimes(1);
      expect(patchPersonalId).toHaveBeenCalledWith(
        userId,
        personalId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.UPDATE_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update personal id procedure is successful', async () => {
    (patchPersonalId as jest.Mock).mockResolvedValueOnce(
      mockPersonalIdResponse,
    );

    await store.dispatch(updatePersonalId(userId, personalId, data, config));

    const actionResults = store.getActions();

    expect(patchPersonalId).toHaveBeenCalledTimes(1);
    expect(patchPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_PERSONAL_ID_REQUEST },
      {
        payload: mockPersonalIdResponse,
        type: actionTypes.UPDATE_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('update personal id success payload');
  });
});
