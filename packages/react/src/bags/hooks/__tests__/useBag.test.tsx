import { cleanup, renderHook } from '@testing-library/react';
import {
  mockBagId,
  mockData,
  mockInitialState,
  mockLoadingState,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useBag from '../useBag';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addBagItem: jest.fn(() => ({ type: 'add-bag-item' })),
  fetchBag: jest.fn(() => ({ type: 'fetch' })),
  resetBag: jest.fn(() => ({ type: 'reset' })),
  resetBagState: jest.fn(() => ({ type: 'resetState' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockState) => {
  const {
    result: { current },
  } = renderHook(() => useBag(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useBag', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      bag: expect.any(Object),
      error: expect.any(Object),
      addBagItem: expect.any(Function),
      fetchBag: expect.any(Function),
      id: expect.any(String),
      isEmpty: expect.any(Boolean),
      isLoading: expect.any(Boolean),
      isWithAnyError: expect.any(Boolean),
      items: expect.any(Array),
      itemsCount: expect.any(Number),
      itemsIds: expect.any(Array),
      itemsUnavailable: expect.any(Array),
      resetBag: expect.any(Function),
      resetBagState: expect.any(Function),
      totalQuantity: expect.any(Number),
    });
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook({
      ...mockState,
      ...mockLoadingState,
    });

    expect(isLoading).toBe(true);
  });

  it('should return isEmpty as true if it does not have items', () => {
    const { isEmpty } = getRenderedHook({ ...mockState, ...mockInitialState });

    expect(isEmpty).toBe(true);
  });

  describe('actions', () => {
    it('should call `addBagItem` action', () => {
      const { addBagItem } = getRenderedHook();

      addBagItem(mockData);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add-bag-item' });
    });

    it('should call `fetchBag` action', () => {
      const { fetchBag } = getRenderedHook();

      fetchBag(mockBagId);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should call `resetBag` action', () => {
      const { resetBag } = getRenderedHook();

      resetBag();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });

    it('should call `resetBagState` action', () => {
      const { resetBagState } = getRenderedHook();

      resetBagState(['state']);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'resetState' });
    });
  });
});
