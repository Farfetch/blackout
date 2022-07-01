import * as actionTypes from '../../actionTypes';
import { checkoutId } from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import { patchCheckoutOrderItems } from '@farfetch/blackout-client';
import { updateGiftMessage } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrderItems: jest.fn(),
}));

describe('updateGiftMessage() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const expectedConfig = undefined;
  const data = [
    {
      checkoutOrderItemId: 1,
      checkoutItemPatchDocument: {
        operations: [
          {
            value: {
              from: 'string',
              to: 'string',
              message: 'string',
            },
            path: 'string',
            op: 'string',
            from: 'string',
          },
        ],
      },
    },
    {
      checkoutOrderItemId: 2,
      checkoutItemPatchDocument: {
        operations: [
          {
            value: {
              from: 'string',
              to: 'string',
            },
            path: 'string',
            op: 'string',
            from: 'string',
          },
        ],
      },
    },
  ];
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update gift message procedure fails', async () => {
    const expectedError = new Error('update gift message error');

    patchCheckoutOrderItems.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(updateGiftMessage(checkoutId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(patchCheckoutOrderItems).toHaveBeenCalledTimes(1);
      expect(patchCheckoutOrderItems).toHaveBeenCalledWith(
        checkoutId,
        data,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.UPDATE_GIFT_MESSAGE_REQUEST },
          {
            type: actionTypes.UPDATE_GIFT_MESSAGE_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the update gift message procedure is successful', async () => {
    patchCheckoutOrderItems.mockResolvedValueOnce();
    await store.dispatch(updateGiftMessage(checkoutId, data));

    const actionResults = store.getActions();

    expect(patchCheckoutOrderItems).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrderItems).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_GIFT_MESSAGE_REQUEST },
      { type: actionTypes.UPDATE_GIFT_MESSAGE_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_GIFT_MESSAGE_SUCCESS,
      }),
    ).toMatchSnapshot('update gift message success payload');
  });
});
