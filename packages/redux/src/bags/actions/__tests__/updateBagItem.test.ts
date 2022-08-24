import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockBagItemData,
  mockBagItemId,
  mockNormalizedPayload,
  mockResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import { patchBagItem } from '@farfetch/blackout-client';
import { updateBagItem } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';
import type { GetOptionsArgument, StoreState } from '../../../types';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  patchBagItem: jest.fn(),
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

describe('updateBagItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when updating a bag item procedure fails', async () => {
    const expectedError = new Error('update bag item error');

    (patchBagItem as jest.Mock).mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await updateBagItem(
      mockBagItemId,
      mockBagItemData,
      undefined,
      bagItemMetadata,
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).catch(
      error => {
        expect(error).toBe(expectedError);
        expect(patchBagItem).toHaveBeenCalledTimes(1);
        expect(patchBagItem).toHaveBeenCalledWith(
          mockBagId,
          mockBagItemId,
          mockBagItemData,
          expectedQuery,
          expectedConfig,
        );
        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            {
              meta: {
                ...bagItemMetadata,
                ...mockBagItemData,
                bagId: mockBagId,
                bagItemId: mockBagItemId,
              },
              type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
            },
            {
              payload: {
                error: expectedError,
              },
              meta: {
                ...bagItemMetadata,
                ...mockBagItemData,
                bagId: mockBagId,
                bagItemId: mockBagItemId,
              },
              type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
            },
          ]),
        );
      },
    );
  });

  it('should create the correct actions for when the update bag item procedure is successful', async () => {
    (patchBagItem as jest.Mock).mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await updateBagItem(
      mockBagItemId,
      mockBagItemData,
      undefined,
      bagItemMetadata,
    )(store.dispatch, store.getState as () => StoreState, { getOptions }).then(
      clientResult => {
        expect(clientResult).toBe(mockResponse);
      },
    );

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
        },
      },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...bagItemMetadata,
          ...mockBagItemData,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('update bag item success payload');
  });

  it('should create the correct actions for when the update bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);

    (patchBagItem as jest.Mock).mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await updateBagItem(mockBagItemId, mockBagItemData)(
      store.dispatch,
      store.getState as () => StoreState,
      {} as GetOptionsArgument,
    ).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(patchBagItem).toHaveBeenCalledTimes(1);
    expect(patchBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      mockBagItemData,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.UPDATE_BAG_ITEM_REQUEST },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
        meta: {
          ...mockBagItemData,
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot(
      'update bag item success payload without receiving options',
    );
  });
});
