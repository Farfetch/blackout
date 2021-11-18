import { doGetMeasurements } from '../';
import { mockMeasurements, mockProductId } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetColorGrouping() action creator', () => {
  let store;
  const getMeasurements = jest.fn();
  const action = doGetMeasurements(getMeasurements);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();

    store = productDetailsMockStore({
      entities: {
        products: {
          [mockProductId]: {
            id: mockProductId,
            gender: 0,
            measurements: mockMeasurements,
          },
        },
      },
    });
  });

  it('should create the correct actions for when the get product measurements procedure fails', async () => {
    const expectedError = new Error('Get product measurements error');

    getMeasurements.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockProductId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getMeasurements).toHaveBeenCalledTimes(1);
      expect(getMeasurements).toHaveBeenCalledWith(
        mockProductId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          payload: { productId: mockProductId },
          type: actionTypes.GET_MEASUREMENTS_REQUEST,
        },
        {
          payload: { error: expectedError, productId: mockProductId },
          type: actionTypes.GET_MEASUREMENTS_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get product measurements procedure is successful', async () => {
    getMeasurements.mockResolvedValueOnce(mockMeasurements);

    await store.dispatch(action(mockProductId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getMeasurements).toHaveBeenCalledTimes(1);
    expect(getMeasurements).toHaveBeenCalledWith(mockProductId, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            payload: { productId: mockProductId },
            type: actionTypes.GET_MEASUREMENTS_REQUEST,
          },
          {
            payload: expect.any(Object),
            type: actionTypes.GET_MEASUREMENTS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_MEASUREMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('Get product measurements success payload');
  });
});
