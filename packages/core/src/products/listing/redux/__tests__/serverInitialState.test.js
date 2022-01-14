import { mockListingModel } from 'tests/__fixtures__/products';
import { serverInitialState } from '../';

describe('listing serverInitialState()', () => {
  it('should initialize server state for a listing', () => {
    const state = serverInitialState({ model: mockListingModel });

    expect(state).toMatchSnapshot();
  });

  it('should build the correct sorted hash with encoded query params', () => {
    const slug = '/en-pt/shopping?colors=11%7C6&another=foo';
    const expectedHash = '/en-pt/listing?colors=11|6&another=foo';
    const subfolder = '/en-pt';
    const model = {
      ...mockListingModel,
      slug,
      subfolder,
    };

    const state = serverInitialState({ model });

    expect(Object.keys(state.entities.searchResults)).toEqual([expectedHash]);
    expect(state.listing.hash).toBe(expectedHash);
  });

  it('should build the correct hash without any query params in the slug', () => {
    const slug = '/en-pt/shopping';
    const expectedHash = '/en-pt/listing';
    const subfolder = '/en-pt';
    const model = { ...mockListingModel, slug, subfolder };
    const state = serverInitialState({ model });

    expect(Object.keys(state.entities.searchResults)).toEqual([expectedHash]);
    expect(state.listing.hash).toBe(expectedHash);
  });

  it('should initialize server state for a non listing', () => {
    const model = {};
    const state = serverInitialState({ model });

    expect(state).toMatchSnapshot();
  });
});
