import { doGetListingFacets } from '../';
import { mockFacetGroups } from 'tests/__fixtures__/products/listing.fixtures';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const mockQuery = {
  facets: 'sizesbycategory',
};

const listingFacetsMockStore = (state = {}) =>
  mockStore({ listing: reducer() }, state);

describe('doGetListingFacets() action creator', () => {
  let store;
  const expectedConfig = undefined;
  const getListingFacets = jest.fn();
  const action = doGetListingFacets(getListingFacets);

  beforeEach(() => {
    jest.clearAllMocks();
    store = listingFacetsMockStore();
  });

  it('should create the correct actions for when getting listing facets fail', async () => {
    const expectedError = new Error('Get listing facets error');

    getListingFacets.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getListingFacets).toHaveBeenCalledTimes(1);
      expect(getListingFacets).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_LISTING_FACETS_REQUEST,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_LISTING_FACETS_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get search procedure is successful', async () => {
    getListingFacets.mockResolvedValueOnce(mockFacetGroups);

    await store.dispatch(action(mockQuery));

    const actionResults = store.getActions();

    expect(getListingFacets).toHaveBeenCalledTimes(1);
    expect(getListingFacets).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(actionResults).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_LISTING_FACETS_REQUEST,
          },
          {
            payload: mockFacetGroups,
            type: actionTypes.GET_LISTING_FACETS_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, {
        type: actionTypes.GET_LISTING_FACETS_SUCCESS,
      }),
    ).toMatchSnapshot('Get listing facets success payload');
  });
});
