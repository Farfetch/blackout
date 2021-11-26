import { cleanup, render } from '@testing-library/react';
import PaymentGateway, {
  addPaymentGatewayListener,
  createInstrument,
  getOperationResult,
  removePaymentGatewayListener,
} from '../PaymentGateway';
import React from 'react';

describe('PaymentGateway', () => {
  const stateUpdaterFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => cleanup());

  describe('<PaymentGateway />', () => {
    it('should render correctly', () => {
      const props = {
        url: 'https://payments.blackout.com/',
        paymentIntentId: '123',
        staticName: 'whitelabel',
        folderName: 'pg-01',
        locale: 'en',
      };

      const expectedUrl =
        'https://payments.blackout.com/?paymentIntentId=123&amp;staticName=whitelabel&amp;folderName=pg-01&amp;locale=en';
      const expectedId = 'PAYMENT_GATEWAY_IFRAME';
      const component = render(<PaymentGateway {...props} />);
      const iframeElement = component.baseElement.firstChild.innerHTML;

      expect(iframeElement).toContain(expectedId);
      expect(iframeElement).toContain(expectedUrl);
    });
  });

  describe('addPaymentGatewayListener', () => {
    it('should register listener', () => {
      window.addEventListener = jest
        .fn()
        .mockImplementationOnce((message, event) => {
          event({ data: { source: 'testing' } });
        });

      addPaymentGatewayListener(stateUpdaterFn);

      expect(window.addEventListener).toHaveBeenCalled();
    });
  });

  describe('removePaymentGatewayListener', () => {
    it('should register listener', () => {
      window.removeEventListener = jest
        .fn()
        .mockImplementationOnce((message, event) => {
          event({ data: { source: 'testing' } });
        });

      removePaymentGatewayListener(stateUpdaterFn);

      expect(window.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('createInstrument', () => {
    it('should postMessage on default element id', () => {
      render(<PaymentGateway />);

      const iframe = document.getElementById('PAYMENT_GATEWAY_IFRAME');

      iframe.contentWindow.postMessage = jest.fn().mockImplementation();

      createInstrument();

      expect(iframe.contentWindow.postMessage).toHaveBeenCalled();
    });

    it('should postMessage on custom element id', () => {
      render(<PaymentGateway id="CUSTOM ELEMENT" />);

      const iframe = document.getElementById('CUSTOM ELEMENT');

      iframe.contentWindow.postMessage = jest.fn().mockImplementation();

      createInstrument({
        elementId: 'CUSTOM ELEMENT',
      });

      expect(iframe.contentWindow.postMessage).toHaveBeenCalled();
    });
  });

  describe('getOperationResult', () => {
    it('should do nothing when window undefined', () => {
      jest
        .spyOn(window, 'window', 'get')
        .mockImplementationOnce(() => undefined);

      const event = {};

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when source is not payment-gateway', () => {
      const event = {
        data: {
          source: 'other source',
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when source is not payment-gateway', () => {
      const event = {
        data: {
          source: 'other source',
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when operation is unknown', () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: 'other operation',
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should do nothing when operation is add-creditCard-instrument but the payload is invalid', () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: 'add-creditCard-instrument',
          payload: { info: {}, data: {} },
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).not.toHaveBeenCalled();
    });

    it('should update state when operation is validation', () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: 'validation',
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).toHaveBeenCalled();
    });

    it('should update state when operation is add-creditCard-instrument', () => {
      const event = {
        data: {
          source: 'payment-gateway',
          operation: 'add-creditCard-instrument',
          payload: { info: { status: 'status' }, data: 'data' },
        },
      };

      getOperationResult(event, stateUpdaterFn);

      expect(stateUpdaterFn).toHaveBeenCalled();
    });
  });
});
