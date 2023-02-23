import * as actionTypes from '../../actionTypes';
import {
  attributeId,
  mockPutUserAttributeResponse,
  mockSetUSerAttributeData,
  userId,
} from 'tests/__fixtures__/users';
import { INITIAL_STATE } from '../../../reducer';
import { mockStore } from '../../../../../tests';
import { putUserAttribute } from '@farfetch/blackout-client';
import { setUserAttribute } from '../';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putUserAttribute: jest.fn(),
}));

const usersMockStore = (state = {}) =>
  mockStore({ users: INITIAL_STATE }, state);

describe('setUserAttribute action creator', () => {
  let store = usersMockStore();

  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = usersMockStore();
  });

  it('should create the correct actions for when the set user attribute procedure fails', async () => {
    const expectedError = new Error('set user attribute error');

    (putUserAttribute as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await setUserAttribute(
          userId,
          attributeId,
          mockSetUSerAttributeData,
        )(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(putUserAttribute).toHaveBeenCalledTimes(1);
    expect(putUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      mockSetUSerAttributeData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.SET_USER_ATTRIBUTE_REQUEST },
        {
          type: actionTypes.SET_USER_ATTRIBUTE_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the set user attribute procedure is successful', async () => {
    (putUserAttribute as jest.Mock).mockResolvedValueOnce(
      mockPutUserAttributeResponse,
    );

    await setUserAttribute(
      userId,
      attributeId,
      mockSetUSerAttributeData,
    )(store.dispatch);

    const actionResults = store.getActions();

    expect(putUserAttribute).toHaveBeenCalledTimes(1);
    expect(putUserAttribute).toHaveBeenCalledWith(
      userId,
      attributeId,
      mockSetUSerAttributeData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_USER_ATTRIBUTE_REQUEST },
      {
        payload: mockPutUserAttributeResponse,
        type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
      }),
    ).toMatchSnapshot('set user attribute success payload');
  });
});
