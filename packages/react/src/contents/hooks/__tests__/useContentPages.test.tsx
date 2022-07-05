import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchContentPages as fetchContentPagesAction,
  getContents,
} from '@farfetch/blackout-redux/contents';
import {
  mockContentPages,
  mockContentPagesErrorState,
  mockContentPagesInitialState,
  mockContentPagesLoadingState,
  slug,
} from 'tests/__fixtures__/contents';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useContentPage from '../useContentPage';
import { ContentType } from '../../types';
import { object } from 'prop-types';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('@farfetch/blackout-redux/contents', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/contents'),
  fetchContentPages: jest.fn(() => ({ type: 'foo-bar' })),
  getContents: jest.fn(),
  resetContents: jest.fn(() => ({ type: 'foo-bar' })),
}));

const getRenderedHook = (state = mockContentPagesInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useContentPage(slug, ContentType.LISTING), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useContentPages', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    getContents.mockImplementationOnce(() => mockContentPages);
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      contentPage: expect.any(Object),
      resetContents: expect.any(Function),
      isLoading: undefined,
      error: undefined,
      fetchContentPages: expect.any(Function),
    });
  });

  it('should call `fetchContentPages` when there is no content page result', () => {
    const { contentPage } = getRenderedHook(mockContentPagesInitialState);

    expect(contentPage).toBe(undefined);
    expect(fetchContentPagesAction).toHaveBeenCalledTimes(1);
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook(mockContentPagesLoadingState);

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const { error } = getRenderedHook(mockContentPagesErrorState);

    expect(error).toEqual({ message: 'Error' });
  });

  it('should call `fetchContentPages` action', () => {
    const { fetchContentPages } = getRenderedHook();

    fetchContentPages();

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'foo-bar' });
  });

  it('should call `resetContent` action', () => {
    const { resetContents } = getRenderedHook();

    resetContents();

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'foo-bar' });
  });
});
