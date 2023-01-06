import { doGetProductOutfits } from '../';
import { mockOutfits, mockProductId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductOutfits() action creator', () => {
  let store;
  const getProductOutfits = jest.fn();
  const action = doGetProductOutfits(getProductOutfits);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            outfits: mockOutfits,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get product outfits procedure fails', async () => {
    const expectedError = new Error('Get product outfits error');

    getProductOutfits.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductOutfits).toHaveBeenCalledTimes(1);
      expect(getProductOutfits).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_OUTFITS_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_PRODUCT_OUTFITS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product outfits procedure is successful', async () => {
    getProductOutfits.mockResolvedValueOnce(mockOutfits);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductOutfits).toHaveBeenCalledTimes(1);
    expect(getProductOutfits).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            payload: { productId: mockProductId },
            type: actionTypes.GET_PRODUCT_OUTFITS_REQUEST,
          },
          {
            payload: expect.any(Object),
            type: actionTypes.GET_PRODUCT_OUTFITS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_OUTFITS_SUCCESS,
      }),
    ).toMatchSnapshot('Get product outfits success payload');
  });
});
