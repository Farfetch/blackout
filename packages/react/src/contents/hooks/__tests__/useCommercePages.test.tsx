import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCommercePages as fetchCommercePagesAction,
  getContents,
} from '@farfetch/blackout-redux';
import {
  mockCommercePages,
  mockCommercePagesErrorState,
  mockCommercePagesInitialState,
  mockCommercePagesLoadingState,
  slug,
} from 'tests/__fixtures__/contents';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useCommercePages from '../useCommercePages';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCommercePages: jest.fn(() => ({ type: 'foo-bar' })),
  getContents: jest.fn(),
  resetContents: jest.fn(() => ({ type: 'foo-bar' })),
}));

const getRenderedHook = (state = mockCommercePagesInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useCommercePages(slug, { type: 'LISTING' }), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useCommercePages', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    getContents.mockImplementationOnce(() => mockCommercePages);
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      commercePage: expect.any(Array),
      resetContents: expect.any(Function),
      isLoading: undefined,
      error: undefined,
      fetchCommercePages: expect.any(Function),
    });
  });

  it('should call `fetchCommercePages` when there is no commerce page result', () => {
    const { commercePage } = getRenderedHook(mockCommercePagesInitialState);

    expect(commercePage).toBe(undefined);
    expect(fetchCommercePagesAction).toHaveBeenCalledTimes(1);
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook(mockCommercePagesLoadingState);

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const { error } = getRenderedHook(mockCommercePagesErrorState);

    expect(error).toEqual({ message: 'Error' });
  });

  it('should call `fetchCommercePages` action', () => {
    const { fetchCommercePages } = getRenderedHook();

    fetchCommercePages();

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'foo-bar' });
  });

  it('should call `resetContent` action', () => {
    const { resetContents } = getRenderedHook();

    resetContents();

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'foo-bar' });
  });
});
