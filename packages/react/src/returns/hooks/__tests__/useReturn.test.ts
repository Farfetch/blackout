import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchReturn,
  resetReturnState,
  updateReturn,
} from '@farfetch/blackout-redux';
import {
  mockPatchData,
  mockState,
  returnEntityDenormalized,
  returnId,
} from 'tests/__fixtures__/returns';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useReturn } from '../../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchReturn: jest.fn(() => ({
      type: 'fetch_return',
    })),
    resetReturnState: jest.fn(() => ({
      type: 'reset_return_state',
    })),
    updateReturn: jest.fn(() => ({
      type: 'update_return',
    })),
  };
});

const defaultReturn = {
  data: undefined,
  isLoading: undefined,
  isFetched: false,
  error: undefined,
  actions: {
    fetch: expect.any(Function),
    reset: expect.any(Function),
    update: expect.any(Function),
  },
};

const mockInitialStateNoData = {
  ...mockState,
  returns: {
    returnDetails: {
      error: {},
      isLoading: {},
    },
  },
  entities: {
    ...mockState.entities,
    returns: {},
  },
};

const mockInitialStateWithData = {
  ...mockInitialStateNoData,
  entities: mockState.entities,
};

const mockErrorState = {
  returns: {
    returnDetails: {
      error: { [returnId]: toBlackoutError(new Error('dummy error')) },
      isLoading: {},
    },
  },
  entities: {
    ...mockState.entities,
    returns: {},
  },
};

const mockLoadingState = {
  ...mockState,
  returns: {
    returnDetails: {
      isLoading: { [returnId]: true },
      error: {},
    },
  },
  entities: {
    ...mockState.entities,
    returns: {},
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useReturn', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the return is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: returnEntityDenormalized,
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.returns.returnDetails.error[returnId],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and returnId parameter is passed', () => {
        renderHook(
          () =>
            useReturn(returnId, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturn).toHaveBeenCalledWith(returnId, mockFetchConfig);
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useReturn(returnId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturn).toHaveBeenCalledWith(returnId, mockFetchConfig);
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturn).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and returnId parameter is not passed', () => {
        renderHook(
          () =>
            // @ts-expect-error Forcing returnId undefined to test
            useReturn(undefined),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturn).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('reset', () => {
      it('should call `resetReturnState` action when returnId parameter is passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useReturn(returnId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetReturnState).toHaveBeenCalledWith([returnId]);
      });

      it('should fail when returnId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
          // @ts-expect-error Forcing returnId undefined to test
        } = renderHook(() => useReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(() => reset()).toThrow('No return id was specified.');
      });
    });

    describe('fetch', () => {
      it('should call `fetchReturn` action when returnId parameter is passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchReturn).toHaveBeenCalledWith(returnId, mockFetchConfig);
      });

      it('should fail when returnId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Forcing returnId undefined to test
            useReturn(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toEqual('No return id was specified.');
      });
    });

    describe('update', () => {
      it('should call `updateReturn` action when returnId parameter is passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useReturn(returnId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        update(mockPatchData, mockFetchConfig);

        expect(updateReturn).toHaveBeenCalledWith(
          returnId,
          mockPatchData,
          mockFetchConfig,
        );
      });

      it('should fail when returnId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
          // @ts-expect-error Forcing returnId undefined to test
        } = renderHook(() => useReturn(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        return expect(update(mockPatchData, mockFetchConfig)).rejects.toEqual(
          'No return id was specified.',
        );
      });
    });
  });
});
