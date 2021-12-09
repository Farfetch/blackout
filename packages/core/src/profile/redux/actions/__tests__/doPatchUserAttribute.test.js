import { mockPatchUserAttributeResponse } from '../../__fixtures__/userAttribute.fixtures';
import { mockStore } from '../../../../../tests';
import doPatchUserAttribute from '../doPatchUserAttribute';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const profileMockStore = (state = {}) =>
  mockStore({ profile: reducer() }, state);

let store;

describe('doPatchUserAttribute action creator', () => {
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
  const patchUserAttribute = jest.fn();
  const action = doPatchUserAttribute(patchUserAttribute);

  beforeEach(() => {
    jest.clearAllMocks();
    store = profileMockStore();
  });

  it('should create the correct actions for when the update user attribute procedure fails', async () => {
    const expectedError = new Error('update user attribute error');

    patchUserAttribute.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(userId, attributeId, data));
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
          { type: actionTypes.PATCH_USER_ATTRIBUTE_REQUEST },
          {
            type: actionTypes.PATCH_USER_ATTRIBUTE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update user attribute procedure is successful', async () => {
    patchUserAttribute.mockResolvedValueOnce(mockPatchUserAttributeResponse);

    await store.dispatch(action(userId, attributeId, data));

    const actionResults = store.getActions();

    expect(patchUserAttribute).toHaveBeenCalledTimes(1);
    expect(patchUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.PATCH_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPatchUserAttributeResponse,
        type: actionTypes.PATCH_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.PATCH_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('update user attribute success payload');
  });
});
