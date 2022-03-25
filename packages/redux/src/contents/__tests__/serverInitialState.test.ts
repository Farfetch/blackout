import {
  expectedNormalizedPayload,
  mockModel,
} from 'tests/__fixtures__/contents';
import { serverInitialState } from '..';

describe('contents serverInitialState()', () => {
  it('should initialize server state for the contents', () => {
    const model = mockModel;
    const state = serverInitialState({ model });

    expect(state).toEqual(expectedNormalizedPayload);
  });

  it('should initialise server state', () => {
    const model = {};
    const state = serverInitialState({ model });

    expect(state).toEqual({
      contents: {
        searchResults: {},
        contentTypes: {
          error: {},
          isLoading: false,
          result: null,
        },
        metadata: {
          error: {},
          isLoading: {},
          result: null,
        },
      },
    });
  });
});
