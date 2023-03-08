import {
  cleanup,
  fireEvent,
  renderHook,
  type RenderResult,
  waitFor,
} from '@testing-library/react';
import {
  createReturn,
  fetchReturn,
  resetReturnState,
  updateReturn,
} from '@farfetch/blackout-redux';
import {
  mockPatchData,
  mockState,
  pickupDay,
  rescheduleRequestId,
  returnEntityDenormalized,
  returnId,
  returnId2,
} from 'tests/__fixtures__/returns/index.mjs';
import { mockStore, withStore, wrap } from '../../../../tests/helpers/index.js';
import { Provider } from 'react-redux';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useReturn } from '../../../index.js';
import ReturnTest from '../__fixtures__/ReturnsTest.fixtures.js';
import useReturnPickupCapability from '../useReturnPickupCapability.js';
import useReturnPickupRescheduleRequests from '../useReturnPickupRescheduleRequests.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchReturn: jest.fn(),
    resetReturnState: jest.fn(),
    updateReturn: jest.fn(),
    createReturn: jest.fn(),
  };
});

jest.mock('../../../helpers/useAction', () => {
  return (thunk: (...args: unknown[]) => unknown) => {
    return (...args: unknown[]) => {
      return thunk(...args);
    };
  };
});

const mockFetchPickupCapabilityFn = jest.fn();
const mockResetPickupCapabilityFn = jest.fn();

jest.mock('../useReturnPickupCapability', () => {
  return jest.fn(() => {
    return {
      ...jest.requireActual('../useReturnPickupCapability'),
      data: undefined,
      isLoading: false,
      isFetched: false,
      error: null,
      actions: {
        fetch: mockFetchPickupCapabilityFn,
        reset: mockResetPickupCapabilityFn,
      },
    };
  });
});

const mockCreatePickupRescheduleRequestFn = jest.fn();
const mockFetchPickupRescheduleRequestFn = jest.fn();
const mockFetchPickupRescheduleRequestsFn = jest.fn();

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
        fetchPickupRescheduleRequest: mockFetchPickupRescheduleRequestFn,
      },
    };
  });
});

const defaultReturn = {
  data: undefined,
  isReturnLoading: undefined,
  isReturnFetched: false,
  returnError: undefined,
  arePickupRescheduleRequestsLoading: false,
  pickupRescheduleRequestsError: null,
  actions: {
    fetch: expect.any(Function),
    reset: expect.any(Function),
    update: expect.any(Function),
    create: expect.any(Function),
    fetchPickupCapability: expect.any(Function),
    resetPickupCapability: expect.any(Function),
    createPickupRescheduleRequest: expect.any(Function),
    fetchPickupRescheduleRequest: expect.any(Function),
    fetchPickupRescheduleRequests: expect.any(Function),
  },
};

const mockInitialStateNoData = {
  ...mockState,
  returns: {
    ...mockState.returns,
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
    ...mockState.returns,
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
    ...mockState.returns,
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

const mockStateWithCreatedReturnId = {
  ...mockState,
  returns: {
    returnDetails: {
      error: {},
      isLoading: {},
    },
  },
  entities: {
    ...mockState.entities,
    returns: {
      [returnId2]: {
        ...mockState.entities.returns[returnId],
        id: returnId2,
      },
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useReturn', () => {
  jest.useFakeTimers();

  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);

    expect(resetReturnState).not.toHaveBeenCalled();

    expect(useReturnPickupCapability).toHaveBeenCalledWith(
      returnId,
      undefined,
      { enableAutoFetch: false },
    );

    expect(useReturnPickupRescheduleRequests).toHaveBeenCalledWith(returnId, {
      enableAutoFetch: false,
    });
  });

  it('should return correctly when the return is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useReturn(returnId), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: {
        ...returnEntityDenormalized,
        pickupRescheduleRequests: undefined,
      },
      isReturnFetched: true,
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
      isReturnFetched: true,
      returnError: mockErrorState.returns.returnDetails.error[returnId],
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
      isReturnLoading: true,
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
        renderHook(() => useReturn(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchReturn).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('reset', () => {
      it('should call `resetReturnState` action with the returnId parameter passed to the hook if no returnId is passed to the function', () => {
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

      it('should call `resetReturnState` action with the returnId parameter passed to the function', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset(returnId);

        expect(resetReturnState).toHaveBeenCalledWith([returnId]);
      });

      it('should not call `resetReturnState` when returnId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetReturnState).not.toHaveBeenCalled();
      });
    });

    describe('fetch', () => {
      it('should call `fetchReturn` action with the returnId parameter passed to the hook if no returnId is passed to the function', () => {
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

      it('should call `fetchReturn` action with the returnId parameter passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useReturn(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch(returnId);

        expect(fetchReturn).toHaveBeenCalledWith(returnId, mockFetchConfig);
      });

      it('should fail when returnId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useReturn(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toThrow('No return id was specified.');
      });
    });

    describe('update', () => {
      it('should call `updateReturn` action with the returnId parameter passed to the hook if no returnId is passed to the function', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useReturn(returnId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        update(undefined, mockPatchData, mockFetchConfig);

        expect(updateReturn).toHaveBeenCalledWith(
          returnId,
          mockPatchData,
          mockFetchConfig,
        );
      });

      it('should call `updateReturn` action with the returnId parameter passed to the function', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        update(returnId, mockPatchData, mockFetchConfig);

        expect(updateReturn).toHaveBeenCalledWith(
          returnId,
          mockPatchData,
          mockFetchConfig,
        );
      });

      it('should fail when returnId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useReturn(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        return expect(
          update(undefined, mockPatchData, mockFetchConfig),
        ).rejects.toThrow('No return id was specified.');
      });

      it('should fail when data parameter is not passed', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => useReturn(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        return expect(
          update(returnId, undefined, mockFetchConfig),
        ).rejects.toThrow('No data was specified.');
      });
    });

    describe('create', () => {
      it('should throw an error if create function is called and the hook is passed a returnId parameter', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() => useReturn(returnId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        return expect(
          create({
            orderId: 'ABCD3F',
            items: [],
            merchantId: 10000,
            numberOfBoxes: 1,
            numberOfItems: 1,
          }),
        ).rejects.toThrow("Cannot call 'create' when 'returnId' is set");
      });

      describe('create return state updates', () => {
        async function testCreateReturn(
          continuation: (result: RenderResult) => Promise<unknown>,
        ) {
          const createData = {
            orderId: 'ABCD3F',
            items: [],
            merchantId: 10000,
            numberOfBoxes: 1,
            numberOfItems: 1,
          };

          const renderResult = wrap(
            <Provider store={mockStore(mockStateWithCreatedReturnId)}>
              <ReturnTest createReturnData={createData} />
            </Provider>,
          ).render();

          const { getByTestId, queryByTestId } = renderResult;

          expect(queryByTestId('return-fetched')?.textContent).toBe('no');
          expect(queryByTestId('return-loading')).toBeNull();
          expect(queryByTestId('return-id')).toBeNull();

          fireEvent.click(getByTestId('return-createButton'));

          expect(createReturn).toHaveBeenCalledWith(createData, undefined);

          await continuation(renderResult);

          return renderResult;
        }

        it('should call `createReturn` action with the correct parameters and change its state accordingly', async () => {
          async function successStateContinuation(renderResult: RenderResult) {
            const { getByTestId, queryByTestId } = renderResult;

            expect(getByTestId('return-loading').textContent).toBe('yes');

            jest.advanceTimersToNextTimer();

            await waitFor(() => {
              expect(getByTestId('return-fetched').textContent).toBe('yes');
              expect(queryByTestId('return-loading')).toBeNull();
              expect(getByTestId('return-id').textContent).toBe(`${returnId2}`);
            });
          }

          const createReturnPromise = new Promise(resolve => {
            setTimeout(() => {
              resolve({ id: returnId2 });
            }, 10000);
          });

          (createReturn as jest.Mock).mockImplementation(() => {
            return createReturnPromise;
          });

          let renderResult = await testCreateReturn(successStateContinuation);
          let rerender = renderResult.rerender;
          let queryByTestId = renderResult.queryByTestId;

          // Test cleanup 1: The hook is rerendered with a different returnId
          // from the one that was created. A call to resetReturnState must happen
          // as well as clearing the create return request state.
          jest.clearAllMocks();

          rerender(
            <Provider store={mockStore(mockStateWithCreatedReturnId)}>
              <ReturnTest returnId={returnId} />
            </Provider>,
          );

          expect(queryByTestId('return-loading')).toBeNull();
          expect(queryByTestId('return-error')).toBeNull();
          expect(queryByTestId('return-id')).toBeNull();

          expect(resetReturnState).toHaveBeenCalledWith([returnId2]);

          // Test cleanup 2: The hook is rerendered with the same returnId
          // as the one that was created. A call to resetReturnState must not
          // happen but the create return request state must be cleared.
          // To avoid the need of creating another test, we will need to
          // set the hook's create return state again to test the cleanup.
          cleanup();

          jest.clearAllMocks();

          renderResult = await testCreateReturn(successStateContinuation);

          rerender = renderResult.rerender;
          queryByTestId = renderResult.queryByTestId;

          const getByTestId = renderResult.getByTestId;

          rerender(
            <Provider store={mockStore(mockStateWithCreatedReturnId)}>
              <ReturnTest returnId={returnId2} />
            </Provider>,
          );

          expect(queryByTestId('return-loading')).toBeNull();
          expect(queryByTestId('return-error')).toBeNull();
          expect(getByTestId('return-id').textContent).toBe(`${returnId2}`);

          expect(resetReturnState).not.toHaveBeenCalled();
        });

        it('should return an error if the call to `createReturn` fails', async () => {
          async function errorStateContinuation(renderResult: RenderResult) {
            jest.advanceTimersToNextTimer();

            const { getByTestId } = renderResult;

            await waitFor(() => {
              expect(getByTestId('return-error').textContent).toBe(
                'Error: dummy error',
              );
            });
          }

          const createReturnPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('dummy error'));
            }, 10000);
          });

          (createReturn as jest.Mock).mockImplementation(() => {
            return createReturnPromise;
          });

          await testCreateReturn(errorStateContinuation);
        });
      });
    });

    describe('fetchPickupCapability', () => {
      it('should call `fetch` from the `useReturnPickupCapability` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchPickupCapability },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        await fetchPickupCapability(returnId2, pickupDay, anotherConfig);

        expect(mockFetchPickupCapabilityFn).toHaveBeenCalledWith(
          returnId2,
          pickupDay,
          anotherConfig,
        );
      });
    });

    describe('resetPickupCapability', () => {
      it('should call `reset` from the `useReturnPickupCapability` hook', async () => {
        const {
          result: {
            current: {
              actions: { resetPickupCapability },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        await resetPickupCapability(returnId2, pickupDay);

        expect(mockResetPickupCapabilityFn).toHaveBeenCalledWith(
          returnId2,
          pickupDay,
        );
      });
    });

    describe('fetchPickupRescheduleRequests', () => {
      it('should call `fetch` from the `useReturnPickupRescheduleRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchPickupRescheduleRequests },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        await fetchPickupRescheduleRequests(returnId, mockFetchConfig);

        expect(mockFetchPickupRescheduleRequestsFn).toHaveBeenCalledWith(
          returnId,
          mockFetchConfig,
        );
      });
    });

    describe('createPickupRescheduleRequest', () => {
      it('should call `create` from the `useReturnPickupRescheduleRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { createPickupRescheduleRequest },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const mockCreatePickupRescheduleData = {
          timeWindow: {
            start: '2022-11-23T13:18:58Z',
            end: '2022-11-24T13:18:58Z',
          },
        };

        await createPickupRescheduleRequest(
          mockCreatePickupRescheduleData,
          returnId,
          mockFetchConfig,
        );

        expect(mockCreatePickupRescheduleRequestFn).toHaveBeenCalledWith(
          mockCreatePickupRescheduleData,
          returnId,
          mockFetchConfig,
        );
      });
    });

    describe('fetchPickupRescheduleRequest', () => {
      it('should call `fetchPickupRescheduleRequest` from the `useReturnPickupRescheduleRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchPickupRescheduleRequest },
            },
          },
        } = renderHook(
          () =>
            useReturn(returnId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        await fetchPickupRescheduleRequest(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );

        expect(mockFetchPickupRescheduleRequestFn).toHaveBeenCalledWith(
          rescheduleRequestId,
          returnId,
          mockFetchConfig,
        );
      });
    });
  });
});
