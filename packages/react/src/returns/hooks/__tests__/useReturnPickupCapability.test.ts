import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchReturnPickupCapability,
  resetReturnPickupCapabilityState,
} from '@farfetch/blackout-redux';
import {
  mockState,
  pickupDay,
  returnId,
  returnPickupCapabilityId,
} from 'tests/__fixtures__/returns';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useReturnPickupCapability } from '../../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchReturnPickupCapability: jest.fn(() => ({
      type: 'fetch_return_pickup_capability',
    })),
    resetReturnPickupCapabilityState: jest.fn(() => ({
      type: 'reset_return_pickup_capability',
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
  },
};

const mockInitialStateNoData = {
  ...mockState,
  returns: {
    returnPickupCapabilities: {
      error: {},
      isLoading: {},
    },
  },
  entities: {
    ...mockState.entities,
    returnPickupCapabilities: {},
  },
};

const mockInitialStateWithData = {
  ...mockInitialStateNoData,
  entities: mockState.entities,
};

const mockErrorState = {
  returns: {
    returnPickupCapabilities: {
      error: {
        [returnPickupCapabilityId]: toBlackoutError(new Error('dummy error')),
      },
      isLoading: {},
    },
  },
  entities: {
    ...mockState.entities,
    returnPickupCapabilities: {},
  },
};

const mockLoadingState = {
  ...mockState,
  returns: {
    returnPickupCapabilities: {
      isLoading: { [returnPickupCapabilityId]: true },
      error: {},
    },
  },
  entities: {
    ...mockState.entities,
    returnPickupCapabilities: {},
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useReturnPickupCapability', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useReturnPickupCapability(returnId, pickupDay), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the return pickup capability is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useReturnPickupCapability(returnId, pickupDay), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: mockInitialStateWithData.entities.returnPickupCapabilities[
        returnPickupCapabilityId
      ],
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useReturnPickupCapability(returnId, pickupDay), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error:
        mockErrorState.returns.returnPickupCapabilities.error[
          returnPickupCapabilityId
        ],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useReturnPickupCapability(returnId, pickupDay), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and both returnId and pickupDay parameters are passed', () => {
        renderHook(
          () =>
            useReturnPickupCapability(returnId, pickupDay, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturnPickupCapability).toHaveBeenCalledWith(
          returnId,
          pickupDay,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useReturnPickupCapability(returnId, pickupDay, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturnPickupCapability).toHaveBeenCalledWith(
          returnId,
          pickupDay,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useReturnPickupCapability(returnId, pickupDay, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturnPickupCapability).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and returnId parameter is not passed', () => {
        renderHook(
          () =>
            // @ts-expect-error Forcing returnId undefined to test
            useReturnPickupCapability(undefined, pickupDay, undefined),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturnPickupCapability).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and pickupDay parameter is not passed', () => {
        renderHook(
          () =>
            // @ts-expect-error Forcing pickupDay undefined to test
            useReturnPickupCapability(returnId, undefined, undefined),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchReturnPickupCapability).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('reset', () => {
      it('should call `resetReturnPickupCapabilityState` action when both returnId and pickupDay parameters are passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useReturnPickupCapability(returnId, pickupDay), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetReturnPickupCapabilityState).toHaveBeenCalledWith([
          { returnId, pickupDay },
        ]);
      });

      it('should fail when returnId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
          // @ts-expect-error Forcing returnId undefined to test
        } = renderHook(() => useReturnPickupCapability(undefined, pickupDay), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(() => reset()).toThrow('No return id was specified.');
      });

      it('should fail when pickupDay parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
          // @ts-expect-error Forcing pickupDay undefined to test
        } = renderHook(() => useReturnPickupCapability(returnId, undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(() => reset()).toThrow('No pickup day was specified.');
      });
    });

    describe('fetch', () => {
      it('should call `fetchReturnPickupCapability` action when both returnId and pickupDay parameters are passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useReturnPickupCapability(returnId, pickupDay, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchReturnPickupCapability).toHaveBeenCalledWith(
          returnId,
          pickupDay,
          mockFetchConfig,
        );
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
            useReturnPickupCapability(undefined, pickupDay, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toEqual('No return id was specified.');
      });

      it('should fail when pickupDay parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Forcing pickupDay undefined to test
            useReturnPickupCapability(returnId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toEqual('No pickup day was specified.');
      });
    });
  });
});
