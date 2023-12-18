import {
  expectedNormalizedPayload,
  mockModel,
} from 'tests/__fixtures__/contents/index.mjs';
import serverInitialState from '../serverInitialState.js';
import type { Model } from '../../types/index.js';

describe('contents serverInitialState()', () => {
  it('should initialize server state for the contents', () => {
    // @ts-expect-error A lot of properties would need to be added to make the value comply with the type which are irrelevant for the test
    const model = mockModel as Model;
    const state = serverInitialState({ model });

    expect(state).toEqual(expectedNormalizedPayload);
  });

  it('should initialise server state', () => {
    const model = {} as Model;
    const state = serverInitialState({ model });

    expect(state).toEqual({
      contents: {
        searchResults: {},
        contentTypes: {
          error: undefined,
          isLoading: false,
          result: undefined,
        },
        metadata: {
          error: {},
          isLoading: {},
          result: undefined,
        },
        seoFiles: {
          error: {},
          isLoading: {},
          result: undefined,
        },
      },
    });
  });
});
