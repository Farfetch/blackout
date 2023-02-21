import * as actionTypes from '../../actionTypes';
import { checkoutId } from 'tests/__fixtures__/checkout';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  patchCheckoutOrderItems,
  type PatchCheckoutOrderItemsData,
} from '@farfetch/blackout-client';
import { updateCheckoutOrderItems } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchCheckoutOrderItems: jest.fn(),
}));

describe('updateCheckoutOrderItems() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  const expectedConfig = undefined;
  const data: PatchCheckoutOrderItemsData = [
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
            op: 'replace',
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
            op: 'add',
          },
        ],
      },
    },
  ];
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the update checkout order items procedure fails', async () => {
    const expectedError = new Error('update checkout order items error');

    (patchCheckoutOrderItems as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await updateCheckoutOrderItems(checkoutId, data)(store.dispatch),
    ).rejects.toThrow(expectedError);

    expect(patchCheckoutOrderItems).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrderItems).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST },
        {
          type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the update checkout order items procedure is successful', async () => {
    (patchCheckoutOrderItems as jest.Mock).mockResolvedValueOnce(200);

    await updateCheckoutOrderItems(
      checkoutId,
      data,
    )(store.dispatch).then(clientResult => {
      expect(clientResult).toBe(200);
    });

    const actionResults = store.getActions();

    expect(patchCheckoutOrderItems).toHaveBeenCalledTimes(1);
    expect(patchCheckoutOrderItems).toHaveBeenCalledWith(
      checkoutId,
      data,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST },
      { type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS,
      }),
    ).toMatchSnapshot('update checkout order items success payload');
  });
});
