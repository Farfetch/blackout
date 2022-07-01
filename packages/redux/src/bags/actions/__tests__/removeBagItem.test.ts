import * as actionTypes from '../../actionTypes';
import { deleteBagItem } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockBagItemId,
  mockNormalizedPayload,
  mockResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import { removeBagItem } from '..';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  deleteBagItem: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state, mockMiddlewares);
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
let store;

describe('removeBagItem() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = bagMockStore(mockState);
  });

  it('should create the correct actions for when the remove bag item procedure fails', async () => {
    const expectedError = new Error('remove bag item error');

    deleteBagItem.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(removeBagItem(mockBagItemId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(deleteBagItem).toHaveBeenCalledTimes(1);
      expect(deleteBagItem).toHaveBeenCalledWith(
        mockBagId,
        mockBagItemId,
        expectedQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            meta: {
              bagId: mockBagId,
              bagItemId: mockBagItemId,
            },
            type: actionTypes.REMOVE_BAG_ITEM_REQUEST,
          },
          {
            payload: {
              error: expectedError,
            },
            meta: {
              bagId: mockBagId,
              bagItemId: mockBagItemId,
            },
            type: actionTypes.REMOVE_BAG_ITEM_FAILURE,
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the remove bag item procedure is successful', async () => {
    deleteBagItem.mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await store.dispatch(removeBagItem(mockBagItemId)).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(deleteBagItem).toHaveBeenCalledTimes(1);
    expect(deleteBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_BAG_ITEM_REQUEST,
        meta: {
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
        meta: {
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('remove bag item success payload');
  });

  it('should create the correct actions for when the remove bag item procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares(mockState);

    deleteBagItem.mockResolvedValueOnce(mockResponse);

    expect.assertions(5);

    await store.dispatch(removeBagItem(mockBagItemId)).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(deleteBagItem).toHaveBeenCalledTimes(1);
    expect(deleteBagItem).toHaveBeenCalledWith(
      mockBagId,
      mockBagItemId,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.REMOVE_BAG_ITEM_REQUEST,
        meta: {
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
      {
        payload: mockNormalizedPayload,
        type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
        meta: {
          bagId: mockBagId,
          bagItemId: mockBagItemId,
        },
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
      }),
    ).toMatchSnapshot('remove bag item success payload');
  });
});
