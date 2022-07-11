import {
  addPaymentGatewayListener,
  createInstrument,
  getOperationResult,
  removePaymentGatewayListener,
} from '../utils';
import { cleanup, render, screen } from '@testing-library/react';
import { ID, OPERATION_TYPE, SCROLLING, TITLE } from '../constants';
import PaymentGateway from '../PaymentGateway';
import React from 'react';
import type { PaymentGatewayEventData } from '../types';

describe('PaymentGateway', () => {
  const stateUpdaterFn = jest.fn();
  const url = 'https://fps-dev-payment-gateway.fftech.info';
  const paymentIntentId = 'abc';
  const staticName = 'whitelabel';
  const folderName = 'pg-12';
  const locale = 'en-US';
  const props = {
    folderName,
    locale,
    paymentIntentId,
    staticName,
    url,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('<PaymentGateway />', () => {
    it('should render correctly', () => {
      const expectedUrl = `${url}?folderName=${folderName}&locale=${locale}&paymentIntentId=${paymentIntentId}&staticName=${staticName}`;

      render(<PaymentGateway {...props} />);

      const iframeElement = screen.getByTitle(/payment_gateway_iframe/i);
      expect(iframeElement).toBeInTheDocument();
      expect(iframeElement.getAttribute('src')).toEqual(expectedUrl);
      expect(iframeElement.getAttribute('scrolling')).toEqual(SCROLLING);
      expect(iframeElement.getAttribute('id')).toEqual(ID);
      expect(iframeElement.getAttribute('title')).toEqual(TITLE);
    });
  });

  describe('addPaymentGatewayListener', () => {
    it('should register listener', () => {
      window.addEventListener = jest
        .fn()
        .mockImplementationOnce((_message, event) => {
          event({ data: { source: 'testing', operation: 'load' } });
        });

      addPaymentGatewayListener(stateUpdaterFn);

      expect(window.addEventListener).toHaveBeenCalled();
    });
  });

  describe('removePaymentGatewayListener', () => {
    it('should remove a listener', () => {
      window.removeEventListener = jest
        .fn()
        .mockImplementationOnce((_message, event) => {
          event({ data: { source: 'testing', operation: 'load' } });
        });

      removePaymentGatewayListener(stateUpdaterFn);

      expect(window.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('createInstrument', () => {
    const paymentGatewayUrl = 'https://fps-dev-payment-gateway.fftech.info/';

    it('should postMessage on default element id', () => {
      render(<PaymentGateway {...props} />);
      const iframeElement = screen.getByTitle(
        /payment_gateway_iframe/i,
      ) as HTMLIFrameElement;
      const iFrameWindow = iframeElement?.contentWindow as Window;
      jest.spyOn(iFrameWindow, 'postMessage').mockImplementation(jest.fn());

      createInstrument(paymentGatewayUrl);

      expect(iFrameWindow.postMessage).toHaveBeenCalled();
    });

    it('should postMessage on custom element id', () => {
      const customElementId = 'customElementId';
      render(<PaymentGateway {...props} id={customElementId} />);

      const iframeElement = screen.getByTitle(
        /payment_gateway_iframe/i,
      ) as HTMLIFrameElement;
      const iFrameWindow = iframeElement?.contentWindow as Window;
      jest.spyOn(iFrameWindow, 'postMessage').mockImplementation();

      createInstrument(paymentGatewayUrl, {
        elementId: customElementId,
      });

      expect(iFrameWindow.postMessage).toHaveBeenCalled();
    });
  });

  describe('getOperationResult', () => {
    it('should do nothing when window undefined', () => {
      jest.spyOn(window, 'window', 'get').mockImplementationOnce(jest.fn());

      const event = {} as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when source is not payment-gateway', () => {
      const event = {
        data: {
          source: 'other source',
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when operation is unknown', () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: 'other operation',
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it(`should update state when operation is "${OPERATION_TYPE.LOAD}"`, () => {
      const mockHeight = 500;
      const event = {
        data: {
          source: 'payment-gateway',
          operation: OPERATION_TYPE.LOAD,
          payload: {
            data: {
              height: mockHeight,
            },
          },
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).toHaveBeenCalledWith({
        formHeight: mockHeight,
      });
    });

    it(`should update state when operation is "${OPERATION_TYPE.RESIZE}"`, () => {
      const mockHeight = 500;
      const event = {
        data: {
          source: 'payment-gateway',
          operation: OPERATION_TYPE.RESIZE,
          payload: {
            data: {
              height: mockHeight,
            },
          },
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).toHaveBeenCalledWith({
        formHeight: mockHeight,
      });
    });

    it(`should update state when operation is "${OPERATION_TYPE.VALIDATION}"`, () => {
      const mockIsFormValid = true;
      const event = {
        data: {
          source: 'payment-gateway',
          operation: OPERATION_TYPE.VALIDATION,
          isFormValid: mockIsFormValid,
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).toHaveBeenCalledWith({
        isFormValid: mockIsFormValid,
      });
    });

    it(`should do nothing when operation is "${OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT}" but the payload is invalid`, () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT,
          payload: { info: {}, data: {} },
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it(`should update state when operation is "${OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT}"`, () => {
      const mockHeight = 500;
      const mockInstrumentId = '123123';
      const event = {
        data: {
          source: 'payment-gateway',
          operation: OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT,
          payload: {
            info: { status: 'status' },
            data: {
              height: mockHeight,
              paymentData: mockInstrumentId,
            },
          },
        },
      } as PaymentGatewayEventData;

      getOperationResult(stateUpdaterFn)(event);

      expect(stateUpdaterFn).toHaveBeenCalledWith({
        formHeight: mockHeight,
        instrumentAdded: true,
        instrumentId: mockInstrumentId,
      });
    });
  });
});
