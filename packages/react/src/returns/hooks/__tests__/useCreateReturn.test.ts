import { cleanup, renderHook } from '@testing-library/react';
import { createReturn, resetCreateReturnState } from '@farfetch/blackout-redux';
import {
  mockPostData,
  mockState,
  returnEntityDenormalized,
  returnId,
} from 'tests/__fixtures__/returns';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useCreateReturn } from '../../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    createReturn: jest.fn(() => ({
      type: 'create_return',
    })),
    resetCreateReturnState: jest.fn(() => ({
      type: 'reset_create_return_state',
    })),
  };
});

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    create: expect.any(Function),
    reset: expect.any(Function),
  },
};

const mockInitialStateNoData = {
  ...mockState,
  returns: {
    createReturn: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    ...mockState.entities,
    returns: {},
  },
};

const mockInitialStateWithData = {
  ...mockState,
  returns: {
    createReturn: {
      error: null,
      isLoading: false,
      result: returnId,
    },
  },
  entities: mockState.entities,
};

const mockErrorState = {
  ...mockState,
  returns: {
    createReturn: {
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
      result: null,
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
    createReturn: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
  entities: {
    ...mockState.entities,
    returns: {},
  },
};

const mockCreateConfig = {
  myCustomParameter: 10,
};

describe('useCreateReturn', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateReturn(), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the created return is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateReturn(), {
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
    } = renderHook(() => useCreateReturn(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.returns.createReturn.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateReturn(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('actions', () => {
    describe('reset', () => {
      it('should call `resetCreateReturnState` action', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useCreateReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetCreateReturnState).toHaveBeenCalled();
      });
    });

    describe('create', () => {
      it('should call `createReturn` action', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() => useCreateReturn(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        create(mockPostData, mockCreateConfig);

        expect(createReturn).toHaveBeenCalledWith(
          mockPostData,
          mockCreateConfig,
        );
      });
    });
  });
});
