import * as actionTypes from '../../actionTypes.js';
import { addBagItem } from '../index.js';
import { find } from 'lodash-es';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockBagId,
  mockBagItemData,
  mockNormalizedPayload,
  mockResponse,
  mockState,
} from 'tests/__fixtures__/bags/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { postBagItem } from '@farfetch/blackout-client';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postBagItem: jest.fn(),
}));

const getOptions = () => ({ productImgQueryParam: '?c=2' });
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions,
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state, mockMiddlewares);
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
const bagItemMetadata = {
  from: 'bag',
  oldQuantity: 1,
  oldSize: 16,
};

let store: ReturnType<typeof bagMockStore>;

describe('addBagItem() action creator', () => {
  beforeEach(jest.clearAllMocks);

  it('should create the correct actions for when the add bag item procedure fails', async () => {
    const expectedError = new Error('post bag item error');

    store = bagMockStore(mockState);
    (postBagItem as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      async () =>
        await addBagItem(
          mockBagId,
          mockBagItemData,
          undefined,
          bagItemMetadata,
        )(store.dispatch, store.getState as () => StoreState, { getOptions }),
    ).rejects.toThrow(expectedError);

    expect(postBagItem).toHaveBeenCalledTimes(1);
    expect(postBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.ADD_BAG_ITEM_REQUEST,
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
      {
        payload: { error: expectedError },
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
        },
        type: actionTypes.ADD_BAG_ITEM_FAILURE,
      },
    ]);
  });

  it('should create the correct actions for when the add bag item procedure is successful', async () => {
    store = bagMockStore(mockState);
    (postBagItem as jest.Mock).mockResolvedValueOnce(mockResponse);

    await addBagItem(
      mockBagId,
      mockBagItemData,
      undefined,
      bagItemMetadata,
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBe(mockResponse);
      },
    );

    const actionResults = store.getActions();

    expect(postBagItem).toHaveBeenCalledTimes(1);
    expect(postBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.ADD_BAG_ITEM_REQUEST,
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('add bag item success payload');
  });

  it('should create the correct actions for when the add bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);
    (postBagItem as jest.Mock).mockResolvedValueOnce(mockResponse);

    await addBagItem(mockBagId, mockBagItemData)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(postBagItem).toHaveBeenCalledTimes(1);
    expect(postBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.ADD_BAG_ITEM_REQUEST,
        meta: {
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
        meta: {
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.ADD_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('add bag item success payload without receiving options');
  });
});
