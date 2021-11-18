import { doGetProductSizes } from '../';
import { mockProductId, mockSizes } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductSizes() action creator', () => {
  let store;
  const getProductSizes = jest.fn();
  const action = doGetProductSizes(getProductSizes);
  const mockQuery = { includeOutOfStock: true };
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            sizes: mockSizes,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get product sizes procedure fails', async () => {
    const expectedError = new Error('Get product sizes error');

    getProductSizes.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId, mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductSizes).toHaveBeenCalledTimes(1);
      expect(getProductSizes).toHaveBeenCalledWith(
        mockProductId,
        mockQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          meta: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_SIZES_REQUEST,
        },
        {
          meta: { productId: mockProductId },
          payload: { error: expectedError },
          type: actionTypes.GET_PRODUCT_SIZES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product sizes procedure is successful', async () => {
    getProductSizes.mockResolvedValueOnce(mockSizes);

    await store.dispatch(action(mockProductId, mockQuery));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductSizes).toHaveBeenCalledTimes(1);
    expect(getProductSizes).toHaveBeenCalledWith(
      mockProductId,
      mockQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            meta: { productId: mockProductId },
            type: actionTypes.GET_PRODUCT_SIZES_REQUEST,
          },
          {
            meta: { productId: mockProductId },
            payload: expect.any(Object),
            type: actionTypes.GET_PRODUCT_SIZES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_SIZES_SUCCESS,
      }),
    ).toMatchSnapshot('Get product sizes success payload');
  });
});
