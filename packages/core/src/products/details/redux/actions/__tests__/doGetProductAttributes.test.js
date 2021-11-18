import { doGetProductAttributes } from '../';
import { mockAttributes, mockProductId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetProductAttributes() action creator', () => {
  let store;
  const getProductAttributes = jest.fn();
  const action = doGetProductAttributes(getProductAttributes);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            attributes: mockAttributes,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get product attributes procedure fails', async () => {
    const expectedError = new Error('Get product attributes error');

    getProductAttributes.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getProductAttributes).toHaveBeenCalledTimes(1);
      expect(getProductAttributes).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_PRODUCT_ATTRIBUTES_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_PRODUCT_ATTRIBUTES_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product attributes procedure is successful', async () => {
    getProductAttributes.mockResolvedValueOnce(mockAttributes);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getProductAttributes).toHaveBeenCalledTimes(1);
    expect(getProductAttributes).toHaveBeenCalledWith(
      mockProductId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            payload: { productId: mockProductId },
            type: actionTypes.GET_PRODUCT_ATTRIBUTES_REQUEST,
          },
          {
            payload: expect.any(Object),
            type: actionTypes.GET_PRODUCT_ATTRIBUTES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_PRODUCT_ATTRIBUTES_SUCCESS,
      }),
    ).toMatchSnapshot('Get product attributes success payload');
  });
});
