import { act, cleanup, renderHook } from '@testing-library/react';
import {
  type PickupRescheduleRequest,
  RescheduleStatus,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  rescheduleRequestId,
  responses,
  returnId,
} from 'tests/__fixtures__/returns';
import { useReturnPickupRescheduleRequest } from '../../..';
import flushPromises from 'tests/flushPromises';
import useReturnPickupRescheduleRequests from '../useReturnPickupRescheduleRequests';

const mockReturnPickupRescheduleResponse =
  responses.getReturnPickupRescheduleRequest.success;
const mockFetchPickupRescheduleRequestsFn = jest.fn();
const mockCreatePickupRescheduleRequestFn = jest.fn();
const mockFetchPickupRescheduleRequest = jest.fn(() => {
  return Promise.resolve(mockReturnPickupRescheduleResponse);
});
const mockFetchPickupRescheduleError = toBlackoutError(
  new Error('dummy error'),
);

const defaultReturnPickupReschedule = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
  },
};

const defaultReturnPickupRescheduleFetched = {
  ...defaultReturnPickupReschedule,
  isFetched: true,
  data: {
    id: '1654321',
    status: 0,
    timeWindow: {
      end: '/Date(1574413200000)/',
      start: '1574445600000',
    },
  },
};

jest.mock('../useReturnPickupRescheduleRequests', () => {
  return jest.fn(() => {
    return {
      ...jest.requireActual('../useReturnPickupRescheduleRequests'),
      data: undefined,
      isLoading: false,
      isFetched: false,
      error: null,
      actions: {
        fetch: mockFetchPickupRescheduleRequestsFn,
        create: mockCreatePickupRescheduleRequestFn,
        fetchPickupRescheduleRequest: mockFetchPickupRescheduleRequest,
      },
    };
  });
});

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useReturnPickupRescheduleRequest', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() =>
      useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
        enableAutoFetch: false,
        fetchConfig: mockFetchConfig,
      }),
    );
    const staticPickupRescheduleRequestsOptions = { enableAutoFetch: false };

    expect(current).toStrictEqual(defaultReturnPickupReschedule);

    expect(mockFetchPickupRescheduleRequest).not.toHaveBeenCalled();

    expect(useReturnPickupRescheduleRequests).toHaveBeenCalledWith(
      returnId,
      staticPickupRescheduleRequestsOptions,
    );
  });

  it('should return correctly when the reschedule request is fetched', async () => {
    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupRescheduleFetched,
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', async () => {
    mockFetchPickupRescheduleRequest.mockRejectedValueOnce(
      mockFetchPickupRescheduleError,
    );

    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedule,
      isFetched: true,
      error: mockFetchPickupRescheduleError,
    });
  });

  it('should return correctly when it is loading', () => {
    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedule,
      isLoading: true,
    });
  });

  it('should clear data if the hook is rerendered with different parameters than the current data it has', async () => {
    const { result, rerender } = renderHook<unknown, { id: number }>(
      ({ id }) =>
        useReturnPickupRescheduleRequest(id, rescheduleRequestId, {
          enableAutoFetch: true,
          fetchConfig: mockFetchConfig,
        }),
      { initialProps: { id: returnId } },
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupRescheduleFetched,
      isFetched: true,
    });

    act(() => rerender({ id: returnId + 1 }));

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedule,
      isLoading: true,
    });
  });

  it('should not update state if the response is for a different request', async () => {
    let fetchPromiseResolve: (
      value: PickupRescheduleRequest | PromiseLike<PickupRescheduleRequest>,
    ) => void;
    const fetchPromise = new Promise<PickupRescheduleRequest>(
      resolve => (fetchPromiseResolve = resolve),
    );

    // Set the first call to fetchPickupRequest client to await for a promise
    // to simulate the request taking too long.
    mockFetchPickupRescheduleRequest.mockImplementationOnce(async () => {
      return await fetchPromise;
    });

    // Render the hook with auto fetch true to force the fetch request
    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    // Make sure it is loading
    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedule,
      isLoading: true,
    });

    // Call fetch with a different reschedule request id than the one passed
    // when invoking the hook. This request should success immediately as it will use
    // the default mock instead of the one used on the previous request.
    await result.current.actions.fetch(rescheduleRequestId + 1);

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    // Make sure it continues to be loading as it should not change the state.
    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedule,
      isLoading: true,
    });

    const successResponse = {
      id: rescheduleRequestId,
      timeWindow: {
        start: '158860601111',
        end: '/Date(158860601111)/',
      },
      status: RescheduleStatus.Failed,
    };

    // Resolve the pending request and check if it has changed state now with
    // the value resolved with the promise.
    await act(async () => await fetchPromiseResolve!(successResponse));

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupRescheduleFetched,
      data: {
        ...successResponse,
      },
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and returnId parameter is passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(mockFetchPickupRescheduleRequest).toHaveBeenCalledWith(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
            enableAutoFetch: true,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(mockFetchPickupRescheduleRequest).toHaveBeenCalledWith(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(mockFetchPickupRescheduleRequest).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and returnId parameter is not passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequest(undefined, rescheduleRequestId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(mockFetchPickupRescheduleRequest).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and pickup reschedule request id parameter is not passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(mockFetchPickupRescheduleRequest).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetch` action with the return id and reschedule request id parameters passed to the hook if no parameters are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        fetch();

        expect(mockFetchPickupRescheduleRequest).toHaveBeenCalledWith(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );
      });

      it('should call `fetch` action with the return id and reschedule request id parameters passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() =>
          useReturnPickupRescheduleRequest(undefined, undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        fetch(rescheduleRequestId, returnId);

        expect(mockFetchPickupRescheduleRequest).toHaveBeenCalledWith(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );
      });

      it('should fail when return id parameters is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() =>
          useReturnPickupRescheduleRequest(undefined, undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        return expect(fetch()).rejects.toThrow('No returnId provided');
      });

      it('should fail when reschedule request id parameters are not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        return expect(fetch()).rejects.toThrow(
          'No pickup reschedule request id provided',
        );
      });
    });

    describe('create', () => {
      it('should call `create` from the `useReturnPickupRescheduleRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() =>
          useReturnPickupRescheduleRequest(returnId, rescheduleRequestId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        const anotherConfig = {};
        const createPickupRescheduleData = {
          timeWindow: {
            start: '2022-11-23T13:18:58Z',
            end: '2022-11-24T13:18:58Z',
          },
        };

        await create(createPickupRescheduleData, returnId, anotherConfig);

        expect(mockCreatePickupRescheduleRequestFn).toHaveBeenCalledWith(
          createPickupRescheduleData,
          returnId,
          anotherConfig,
        );
      });
    });
  });
});
