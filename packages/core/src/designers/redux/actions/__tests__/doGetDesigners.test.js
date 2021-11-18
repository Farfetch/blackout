import { doGetDesigners } from '../';
import {
  mockNormalizedPayload,
  mockQuery,
  mockResponse,
} from 'tests/__fixtures__/designers';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ subfolder: 'us' }),
  }),
];
const designersMockStore = (state = {}) =>
  mockStore({ designers: reducer() }, state, mockMiddlewares);
const designersMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ designers: reducer() }, state);

describe('doGetDesigners() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getDesigners = jest.fn();
  const action = doGetDesigners(getDesigners);
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = designersMockStore();
  });

  it('should create the correct actions for when the get designers procedure fails', async () => {
    const expectedError = new Error('Get designers error');

    getDesigners.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getDesigners).toHaveBeenCalledTimes(1);
      expect(getDesigners).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_DESIGNERS_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_DESIGNERS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get designers procedure is successful', async () => {
    getDesigners.mockResolvedValueOnce(mockResponse);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getDesigners).toHaveBeenCalledTimes(1);
    expect(getDesigners).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.SET_DESIGNER_RESULT_HASH,
          },
          {
            type: actionTypes.GET_DESIGNERS_REQUEST,
          },
          {
            payload: mockResponse,
            type: actionTypes.GET_DESIGNERS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_DESIGNERS_SUCCESS }),
    ).toMatchSnapshot('Get product DESIGNERS success payload');
  });

  it('should create the correct actions for when the get designers procedure is successful without receiving options', async () => {
    store = designersMockStoreWithoutMiddlewares();

    getDesigners.mockResolvedValueOnce(mockResponse);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getDesigners).toHaveBeenCalledTimes(1);
    expect(getDesigners).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.SET_DESIGNER_RESULT_HASH,
          },
          {
            type: actionTypes.GET_DESIGNERS_REQUEST,
          },
          {
            payload: mockResponse,
            type: actionTypes.GET_DESIGNERS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_DESIGNERS_SUCCESS }),
    ).toMatchSnapshot(
      'Get product DESIGNERS success payload without receiving options',
    );
  });

  it('should return if designers result already exists and useCache flag is true', async () => {
    store = designersMockStore({
      ...store.designers,
      entities: { ...mockNormalizedPayload.entities },
    });

    await store.dispatch(action(mockQuery, true));

    const actionResults = store.getActions();

    expect(normalizeSpy).not.toHaveBeenCalled();
    expect(getDesigners).not.toHaveBeenCalled();
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.SET_DESIGNER_RESULT_HASH,
        }),
      ]),
    );
  });
});
