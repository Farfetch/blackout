import { doGetContentPages } from '..';
import {
  expectedContentPagesNormalizedPayload,
  mockContentPages,
  typeContent,
} from 'tests/__fixtures__/contents';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

jest.mock('../../../utils', () => ({
  buildContentGroupHash: () => 'content_pages!woman',
  buildSEOPathname: jest.fn(),
}));

const contentPagesMockStore = (state = {}) =>
  mockStore({ contents: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetContentPages() action creator', () => {
  const getContentPages = jest.fn();
  const action = doGetContentPages(getContentPages);
  const slug = '/shopping/test';

  beforeEach(() => {
    jest.clearAllMocks();
    store = contentPagesMockStore();
  });

  it('should create the correct actions for when the get content pages procedure fails', async () => {
    const expectedError = new Error('Get content pages error');

    getContentPages.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(slug, typeContent));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getContentPages).toHaveBeenCalledTimes(1);
      expect(getContentPages).toHaveBeenCalledWith(
        typeContent,
        { slug, strategy: undefined },
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_CONTENT_PAGES_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_CONTENT_PAGES_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get content pages procedure is successful', async () => {
    getContentPages.mockResolvedValueOnce(mockContentPages);

    expect.assertions(5);

    await store.dispatch(action(slug, typeContent));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getContentPages).toHaveBeenCalledTimes(1);
    expect(getContentPages).toHaveBeenCalledWith(
      typeContent,
      { slug, strategy: undefined },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_CONTENT_PAGES_REQUEST,
          },
          {
            payload: expectedContentPagesNormalizedPayload,
            type: actionTypes.GET_CONTENT_PAGES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_CONTENT_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get content pages payload');
  });
});
