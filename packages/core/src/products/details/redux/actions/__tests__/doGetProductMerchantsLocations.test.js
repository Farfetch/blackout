import { doGetProductMerchantsLocations } from '../';
import {
  mockDetailsState,
  mockMerchantsLocations,
  mockProductId,
  mockVariantId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductMerchantsLocations() action creator', () => {
  let store;
  const getProductMerchantsLocations = jest.fn();
  const action = doGetProductMerchantsLocations(getProductMerchantsLocations);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore(mockDetailsState);
  });

  it('should create the correct actions for when the get product merchants locations procedure fails', async () => {
    const expectedError = new Error('Get product merchants locations error');

    getProductMerchantsLocations.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId, mockVariantId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductMerchantsLocations).toHaveBeenCalledTimes(1);
      expect(getProductMerchantsLocations).toHaveBeenCalledWith(
        mockProductId,
        mockVariantId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product merchants locations procedure is successful', async () => {
    getProductMerchantsLocations.mockResolvedValueOnce(mockMerchantsLocations);

    await store.dispatch(action(mockProductId, mockVariantId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockVariantId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      }),
    ).toMatchSnapshot('Get product merchants locations success payload');
  });

  it('should create the correct actions for when the get product merchants locations receives an unknown variant id', async () => {
    const mockVariant = 1234;

    getProductMerchantsLocations.mockResolvedValueOnce(mockMerchantsLocations);

    await store.dispatch(action(mockProductId, mockVariant));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductMerchantsLocations).toHaveBeenCalledTimes(1);
    expect(getProductMerchantsLocations).toHaveBeenCalledWith(
      mockProductId,
      mockVariant,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        meta: { productId: mockProductId },
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      },
      {
        meta: { productId: mockProductId },
        payload: expect.any(Object),
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      }),
    ).toMatchSnapshot(
      'Get product merchants locations success payload with an unknown variant id',
    );
  });
});
