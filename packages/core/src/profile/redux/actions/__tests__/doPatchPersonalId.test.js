import { mockPatchPersonalIdResponse } from '../../__fixtures__/personalId.fixtures';
import { mockStore } from '../../../../../tests';
import doPatchPersonalId from '../doPatchPersonalId';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

let store;

describe('doPatchPersonalId action creator', () => {
  const userId = 123456;
  const personalId = '123456';
  const data = {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    idNumber: 'string',
    name: 'string',
  };
  const expectedConfig = undefined;
  const patchPersonalId = jest.fn();
  const action = doPatchPersonalId(patchPersonalId);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the patch personal id procedure fails', async () => {
    const expectedError = new Error('patch personal id error');

    patchPersonalId.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, personalId, data));
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
          { type: actionTypes.PATCH_PERSONAL_ID_REQUEST },
          {
            type: actionTypes.PATCH_PERSONAL_ID_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the patch personal id procedure is successful', async () => {
    patchPersonalId.mockResolvedValueOnce(mockPatchPersonalIdResponse);

    await store.dispatch(action(userId, personalId, data));

    const actionResults = store.getActions();

    expect(patchPersonalId).toHaveBeenCalledTimes(1);
    expect(patchPersonalId).toHaveBeenCalledWith(
      userId,
      personalId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.PATCH_PERSONAL_ID_REQUEST },
      {
        payload: mockPatchPersonalIdResponse,
        type: actionTypes.PATCH_PERSONAL_ID_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PATCH_PERSONAL_ID_SUCCESS,
      }),
    ).toMatchSnapshot('patch personal id success payload');
  });
});
