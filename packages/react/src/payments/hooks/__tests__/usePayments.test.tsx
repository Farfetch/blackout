import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import {
  createInstruments as createInstrumentsAction,
  fetchInstruments as fetchInstrumentsAction,
  removeInstrument as removeInstrumentAction,
  updateInstruments as updateInstrumentsAction,
} from '@farfetch/blackout-redux/payments';
import {
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/payments';
import { mockResponse } from 'tests/__fixtures__/checkout';
import { mockStore, wrap } from '../../../../tests/helpers';
import { mockUsersResponse } from 'tests/__fixtures__/users';
import { Payments } from './__fixtures__/Payments.fixtures';
import { Provider } from 'react-redux';
import { usePayments } from '../..';
import React from 'react';

const order = mockResponse.checkoutOrder;
const user = mockUsersResponse;

jest.mock('@farfetch/blackout-redux/payments', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/payments'),
  createInstruments: jest.fn(() => ({ type: 'add' })),
  fetchInstruments: jest.fn(() => ({ type: 'get' })),
  removeInstrument: jest.fn(() => ({ type: 'delete' })),
  updateInstruments: jest.fn(() => ({ type: 'update' })),
}));

describe('usePayments', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly', () => {
    const {
      result: { current },
    } = renderHook(() => usePayments({ order, user }), {
      wrapper: props => (
        <Provider store={mockStore(mockInitialState)} {...props} />
      ),
    });

    expect(typeof current.createInstrument).toBe('function');
    expect(typeof current.deleteInstrument).toBe('function');
    expect(typeof current.updateInstrument).toBe('function');
    expect(current.instrumentsError).toBeNull();
    expect(current.isInstrumentsLoading).toBeFalsy();
  });

  it('should render in loading state', () => {
    const { container, getByTestId } = wrap(
      <Payments order={order} user={user} />,
    )
      .withStore(mockLoadingState)
      .render();

    expect(getByTestId('instruments-loading').textContent).toBe('yes');

    expect(container).toMatchSnapshot();
  });

  it('should render in error state', () => {
    const { container, getByTestId } = wrap(
      <Payments order={order} user={user} />,
    )
      .withStore(mockErrorState)
      .render();

    expect(getByTestId('instruments-error').textContent).toBe('Error');

    expect(container).toMatchSnapshot();
  });

  describe('actions', () => {
    it('should call `create` action', () => {
      const { getByTestId, queryByTestId } = wrap(
        <Payments order={order} user={user} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-createButton'));

      expect(createInstrumentsAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('instruments-loading')).toBeNull();
      expect(queryByTestId('instruments-error')).toBeNull();
    });

    it('should call `get` action', () => {
      const { getByTestId, queryByTestId } = wrap(
        <Payments order={order} user={user} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-getButton'));

      expect(fetchInstrumentsAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('instruments-loading')).toBeNull();
      expect(queryByTestId('instruments-error')).toBeNull();
    });

    it('should call `remove` action', () => {
      const { getByTestId, queryByTestId } = wrap(
        <Payments order={order} user={user} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-deleteButton'));

      expect(removeInstrumentAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('instruments-loading')).toBeNull();
      expect(queryByTestId('instruments-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId, queryByTestId } = wrap(
        <Payments order={order} user={user} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-updateButton'));

      expect(updateInstrumentsAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('instruments-loading')).toBeNull();
      expect(queryByTestId('instruments-error')).toBeNull();
    });
  });

  describe('handleCreateInstrument', () => {
    it('should call createInstrumentsAction', () => {
      const { getByTestId } = wrap(<Payments order={order} user={user} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-handleCreateInstrumentButton'));

      expect(createInstrumentsAction).toHaveBeenCalledTimes(1);
    });

    it('should call createInstrumentsAction without billing address', () => {
      const { getByTestId } = wrap(
        <Payments
          // @ts-ignore undefined value is intended for testing purpuses
          order={{ ...order, billingAddress: undefined }}
          user={user}
        />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-handleCreateInstrumentButton'));

      expect(createInstrumentsAction).toHaveBeenCalledTimes(1);
    });

    it('should call createInstrumentsAction without token id', () => {
      const { getByTestId } = wrap(
        <Payments
          // @ts-ignore undefined value is intended for testing purpuses
          order={{ ...order, billingAddress: undefined }}
          user={user}
        />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(
        getByTestId('instruments-handleCreateInstrumentButtonWithoutTokenId'),
      );

      expect(createInstrumentsAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleDeleteInstrument', () => {
    it('should call removeInstrumentAction', () => {
      const { getByTestId } = wrap(<Payments order={order} user={user} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-handleDeleteInstrumentButton'));

      expect(removeInstrumentAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleUpdateInstrument', () => {
    it('should call updateInstrumentsAction', () => {
      const { getByTestId } = wrap(<Payments order={order} user={user} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('instruments-handleUpdateInstrumentButton'));

      expect(updateInstrumentsAction).toHaveBeenCalledTimes(1);
    });

    it('should call updateInstrumentsAction without email and billing address', () => {
      const { getByTestId } = wrap(
        <Payments
          // @ts-ignore undefined value is intended for testing purpuses
          order={{ ...order, billingAddress: undefined }}
          user={user}
        />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(
        getByTestId('instruments-handleUpdateInstrumentButtonWithoutEmail'),
      );

      expect(updateInstrumentsAction).toHaveBeenCalledTimes(1);
    });
  });
});
