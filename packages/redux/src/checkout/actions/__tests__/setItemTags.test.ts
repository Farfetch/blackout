import { actionTypes } from '../..';
import {
  checkoutId,
  checkoutOrderItemId,
  expectedNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { putItemTags } from '@farfetch/blackout-client/checkout';
import { setItemTags } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client/checkout', () => ({
  ...jest.requireActual('@farfetch/blackout-client/checkout'),
  putItemTags: jest.fn(),
}));

describe('setItemTags() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const data = {
    something: 'something',
  };
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the set items tags procedure fails', async () => {
    const expectedError = new Error('set item tags error');

    putItemTags.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(setItemTags(checkoutId, checkoutOrderItemId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(putItemTags).toHaveBeenCalledTimes(1);
      expect(putItemTags).toHaveBeenCalledWith(
        checkoutId,
        checkoutOrderItemId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.SET_ITEM_TAGS_REQUEST },
          {
            type: actionTypes.SET_ITEM_TAGS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the set items tags procedure is successful', async () => {
    putItemTags.mockResolvedValueOnce(mockResponse);
    await store.dispatch(setItemTags(checkoutId, checkoutOrderItemId, data));

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(putItemTags).toHaveBeenCalledTimes(1);
    expect(putItemTags).toHaveBeenCalledWith(
      checkoutId,
      checkoutOrderItemId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.SET_ITEM_TAGS_REQUEST },
      {
        type: actionTypes.SET_ITEM_TAGS_SUCCESS,
        payload: expectedNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_ITEM_TAGS_SUCCESS,
      }),
    ).toMatchSnapshot('set item tags success payload');
  });
});
