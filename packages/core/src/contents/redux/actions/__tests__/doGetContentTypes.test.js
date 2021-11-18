import { doGetContentTypes } from '..';
import { mockStore } from '../../../../../tests';
import { result, types } from 'tests/__fixtures__/contents';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const contentTypesMockStore = (state = {}) =>
  mockStore({ contents: reducer() }, state);
const expectedConfig = undefined;
const spaceCode = 'website';

describe('doGetContentTypes() action creator', () => {
  let store;
  const getContentTypes = jest.fn();
  const action = doGetContentTypes(getContentTypes);

  beforeEach(() => {
    jest.clearAllMocks();
    store = contentTypesMockStore();
  });

  it('should create the correct actions for fetching content types when procedure is failure', async () => {
    const expectedError = new Error('Get content error');

    getContentTypes.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(spaceCode));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getContentTypes).toHaveBeenCalledTimes(1);
      expect(getContentTypes).toHaveBeenCalledWith(spaceCode, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.GET_CONTENT_TYPES_FAILURE,
            payload: { error: expectedError },
          }),
        ]),
      );
    }
  });

  it('should create the correct actions for fetching content types when procedure is successful', async () => {
    getContentTypes.mockResolvedValueOnce(types);

    await store.dispatch(action(spaceCode));

    const actionResults = store.getActions();

    expect(getContentTypes).toHaveBeenCalledTimes(1);
    expect(getContentTypes).toHaveBeenCalledWith(spaceCode, expectedConfig);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actionTypes.GET_CONTENT_TYPES_SUCCESS,
          payload: result,
        }),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_CONTENT_TYPES_SUCCESS,
      }),
    ).toMatchSnapshot();
  });
});
