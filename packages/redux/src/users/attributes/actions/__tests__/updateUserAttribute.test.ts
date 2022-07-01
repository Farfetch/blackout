import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../../reducer';
import { mockPatchUserAttributeResponse } from 'tests/__fixtures__/users';
import { mockStore } from '../../../../../tests';
import { patchUserAttribute } from '@farfetch/blackout-client';
import { updateUserAttribute } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('updateUserAttribute action creator', () => {
  let store = usersMockStore();
  const userId = 123456;
  const attributeId = '123456';
  const data = [
    {
      op: 'replace',
      path: 'details/items/key2',
      value: '362251',
    },
  ];
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the update user attribute procedure fails', async () => {
    const expectedError = new Error('update user attribute error');

    (patchUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateUserAttribute(userId, attributeId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchUserAttribute).toHaveBeenCalledTimes(1);
      expect(patchUserAttribute).toHaveBeenCalledWith(
        userId,
        attributeId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update user attribute procedure is successful', async () => {
    (patchUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPatchUserAttributeResponse,
    );

    await store.dispatch(updateUserAttribute(userId, attributeId, data));

    const actionResults = store.getActions();

    expect(patchUserAttribute).toHaveBeenCalledTimes(1);
    expect(patchUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPatchUserAttributeResponse,
        type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('update user attribute success payload');
  });
});
