import { act, cleanup, renderHook } from '@testing-library/react';
import {
  getReturnPickupRescheduleRequest,
  getReturnPickupRescheduleRequests,
  postReturnPickupRescheduleRequest,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  rescheduleRequestId,
  responses,
  returnId,
} from 'tests/__fixtures__/returns';
import { useReturnPickupRescheduleRequests } from '../../..';
import flushPromises from 'tests/flushPromises';

const mockReturnPickupReschedulesResponse =
  responses.getReturnPickupRescheduleRequests.success;

jest.mock('@farfetch/blackout-client', () => {
  const original = jest.requireActual('@farfetch/blackout-client');

  return {
    ...original,
    getReturnPickupRescheduleRequests: jest.fn(() =>
      Promise.resolve(mockReturnPickupReschedulesResponse),
    ),
    postReturnPickupRescheduleRequest: jest.fn(),
    getReturnPickupRescheduleRequest: jest.fn(() => ({
      type: 'fetch_return_pickup_capability',
    })),
  };
});

const mockFetchPickupReschedulesError = toBlackoutError(
  new Error('dummy error'),
);

const defaultReturnPickupReschedules = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
    fetchPickupRescheduleRequest: expect.any(Function),
  },
};

const defaultReturnPickupReschedulesFetched = {
  ...defaultReturnPickupReschedules,
  isFetched: true,
  data: [
    {
      id: '1654321',
      status: 0,
      timeWindow: {
        end: '/Date(1574413200000)/',
        start: '1574445600000',
      },
    },
  ],
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useReturnPickupRescheduleRequests', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() =>
      useReturnPickupRescheduleRequests(returnId, {
        enableAutoFetch: false,
        fetchConfig: mockFetchConfig,
      }),
    );

    expect(current).toStrictEqual(defaultReturnPickupReschedules);

    expect(getReturnPickupRescheduleRequests).not.toHaveBeenCalled();
  });

  it('should return correctly when the reschedule request is fetched', async () => {
    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequests(returnId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedulesFetched,
    });
  });

  it('should return correctly when there is an error', async () => {
    (getReturnPickupRescheduleRequests as jest.Mock).mockRejectedValueOnce(
      mockFetchPickupReschedulesError,
    );

    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequests(returnId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedules,
      isFetched: true,
      error: mockFetchPickupReschedulesError,
    });
  });

  it('should return correctly when it is loading', () => {
    const { result } = renderHook(() =>
      useReturnPickupRescheduleRequests(returnId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedules,
      isLoading: true,
    });
  });

  it('should clear data if the hook is rerendered with different parameters than the current data it has', async () => {
    const { result, rerender } = renderHook<unknown, { id: number }>(
      ({ id }) =>
        useReturnPickupRescheduleRequests(id, {
          enableAutoFetch: true,
          fetchConfig: mockFetchConfig,
        }),
      { initialProps: { id: returnId } },
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedulesFetched,
      isFetched: true,
    });

    act(() => rerender({ id: returnId + 1 }));

    expect(result.current).toStrictEqual({
      ...defaultReturnPickupReschedules,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and returnId parameter is passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequests(returnId, {
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
          returnId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequests(returnId, {
            enableAutoFetch: true,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
          returnId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is not passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequests(returnId, {
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
          returnId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequests(returnId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getReturnPickupRescheduleRequests).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and returnId parameter is not passed', () => {
        renderHook(() =>
          useReturnPickupRescheduleRequests(undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getReturnPickupRescheduleRequests).not.toHaveBeenCalled();
      });
    });

    describe('actions', () => {
      describe('fetch', () => {
        it('should call `getReturnPickupRescheduleRequests` action with the return id parameter passed to the hook if no parameters are passed to the action', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          fetch();

          expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
            returnId,
            mockFetchConfig,
          );
        });

        it('should call `getReturnPickupRescheduleRequests` action with the return id parameter passed to the action', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          fetch(returnId);

          expect(getReturnPickupRescheduleRequests).toHaveBeenCalledWith(
            returnId,
            mockFetchConfig,
          );
        });

        it('should fail when return id parameter is not passed to both the hook and the function', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          return expect(fetch()).rejects.toThrow('No returnId provided');
        });
      });

      describe('create', () => {
        it('should call `postReturnPickupRescheduleRequest` function with the return id parameter passed to the hook if no return id is passed to the action', async () => {
          const {
            result: {
              current: {
                actions: { create },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(returnId, {
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

          await create(createPickupRescheduleData, undefined, anotherConfig);

          expect(postReturnPickupRescheduleRequest).toHaveBeenCalledWith(
            returnId,
            createPickupRescheduleData,
            anotherConfig,
          );
        });

        it('should call `postReturnPickupRescheduleRequest` function with the return id parameter passed to the action', async () => {
          const {
            result: {
              current: {
                actions: { create },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
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

          expect(postReturnPickupRescheduleRequest).toHaveBeenCalledWith(
            returnId,
            createPickupRescheduleData,
            anotherConfig,
          );
        });

        it('should fail when return id parameter is not passed to both the hook and the function', async () => {
          const {
            result: {
              current: {
                actions: { create },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
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

          return expect(
            create(createPickupRescheduleData, undefined, anotherConfig),
          ).rejects.toThrow('No returnId provided');
        });
      });

      describe('fetchPickupRescheduleRequest', () => {
        it('should call `getReturnPickupRescheduleRequest` action with the return id parameter passed to the hook if no return id is passed to the function', async () => {
          const {
            result: {
              current: {
                actions: { fetchPickupRescheduleRequest },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          await fetchPickupRescheduleRequest(
            rescheduleRequestId,
            undefined,
            mockFetchConfig,
          );

          expect(getReturnPickupRescheduleRequest).toHaveBeenCalledWith(
            returnId,
            rescheduleRequestId,
            mockFetchConfig,
          );
        });

        it('should call `getReturnPickupRescheduleRequest` action with the return id parameter passed to the function', async () => {
          const {
            result: {
              current: {
                actions: { fetchPickupRescheduleRequest },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          await fetchPickupRescheduleRequest(
            rescheduleRequestId,
            returnId,
            mockFetchConfig,
          );

          expect(getReturnPickupRescheduleRequest).toHaveBeenCalledWith(
            returnId,
            rescheduleRequestId,
            mockFetchConfig,
          );
        });

        it('should fail when return id parameter is not passed to both the hook and the function', async () => {
          const {
            result: {
              current: {
                actions: { fetchPickupRescheduleRequest },
              },
            },
          } = renderHook(() =>
            useReturnPickupRescheduleRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          return expect(
            fetchPickupRescheduleRequest(
              rescheduleRequestId,
              undefined,
              mockFetchConfig,
            ),
          ).rejects.toThrow('No returnId provided');
        });
      });
    });
  });
});
