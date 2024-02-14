import * as packagingOptionsReducer from '../reducer.js';
import * as selectors from '../selectors.js';
import { mockPackagingOptionsState } from 'tests/__fixtures__/checkout/index.mjs';
import type { StoreState } from '../../../index.js';

describe('packaging options redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  it('should get the packaging options result property from state', () => {
    const spy = jest.spyOn(packagingOptionsReducer, 'getPackagingOptions');

    expect(
      selectors.getPackagingOptionsResult(
        mockPackagingOptionsState as StoreState,
      ),
    ).toEqual(mockPackagingOptionsState.packagingOptions.result);
    expect(spy).toHaveBeenCalledWith(
      mockPackagingOptionsState.packagingOptions,
    );
  });

  it('should get the packaging options error property from state', () => {
    const spy = jest.spyOn(packagingOptionsReducer, 'getPackagingOptions');

    expect(
      selectors.getPackagingOptionsError(
        mockPackagingOptionsState as StoreState,
      ),
    ).toEqual(mockPackagingOptionsState.packagingOptions.error);
    expect(spy).toHaveBeenCalledWith(
      mockPackagingOptionsState.packagingOptions,
    );
  });

  it('should get the packaging options isLoading property from state', () => {
    const spy = jest.spyOn(packagingOptionsReducer, 'getPackagingOptions');

    expect(
      selectors.isPackagingOptionsLoading(
        mockPackagingOptionsState as StoreState,
      ),
    ).toEqual(mockPackagingOptionsState.packagingOptions.isLoading);
    expect(spy).toHaveBeenCalledWith(
      mockPackagingOptionsState.packagingOptions,
    );
  });
});
