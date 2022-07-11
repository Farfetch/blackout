import { ID, OPERATION_SOURCE, OPERATION_TYPE } from './constants';
import type {
  CreateInstrumentProps,
  PaymentGatewayAction,
  PaymentGatewayEventData,
  PaymentGatewayListenerCallbackFunction,
  PaymentGatewayState,
  PaymentGatewayStateUpdaterFn,
} from './types';

export const initialState: PaymentGatewayState = {
  formHeight: undefined,
  instrumentAdded: false,
  instrumentId: '',
  isFormValid: false,
};

export const paymentGatewayReducer = (
  state: PaymentGatewayState,
  action: PaymentGatewayAction,
) => {
  return { ...state, ...action };
};

/**
 * Sets state according to the operation performed by the Payment Gateway.
 *
 * @param event          - Event.
 * @param stateUpdaterFn - State updater.
 *
 */
export const getOperationResult =
  (stateUpdaterFn: PaymentGatewayStateUpdaterFn) =>
  (event: PaymentGatewayEventData) => {
    if (typeof window === 'undefined') {
      return;
    }

    const data = event.data;
    const source = data.source;

    if (source !== OPERATION_SOURCE) {
      return;
    }

    const { operation, isFormValid, payload } = data;
    const payloadStatus = payload?.info?.status;
    const payloadData = payload?.data;
    const paymentData = payloadData?.paymentData;

    if (
      operation === OPERATION_TYPE.LOAD ||
      operation === OPERATION_TYPE.RESIZE
    ) {
      stateUpdaterFn({
        formHeight: payloadData?.height,
      });
    }

    if (operation === OPERATION_TYPE.VALIDATION) {
      stateUpdaterFn({ isFormValid });
    }

    if (
      operation === OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT &&
      payloadStatus &&
      payloadData
    ) {
      stateUpdaterFn({
        formHeight: payloadData?.height,
        instrumentAdded: true,
        instrumentId: paymentData,
      });
    }
  };

/**
 * Adds an event listener responsible for sending messages to the Payment Gateway.
 *
 * @param stateUpdaterFn - Callback that is executed when the messages are sent
 * between iframe and Payment Gateway.
 *
 * @example using functional components
 *
 * ```ts
 * import {
 *    initialState,
 *    addPaymentGatewayListener,
 *    paymentGatewayReducer,
 *    getOperationResult
 * } from '@farfetch/blackout-react/payments';
 *
 * import React, { useEffect, useReducer } from 'react';
 *
 * // create reducer to handle state
 * const [paymentGatewayState, paymentGatewayDispatch] = useReducer(
 *    paymentGatewayReducer,
 *    initialState
 * );
 *
 * // add the listener
 * useEffect(() => {
 *    const listenerFn = getOperationResult(paymentGatewayDispatch);
 *
 *    addPaymentGatewayListener(listenerFn);
 *
 *    (...)
 * }, []);
 * ```
 */
export const addPaymentGatewayListener = (
  stateUpdaterFn: PaymentGatewayListenerCallbackFunction,
) => {
  window.addEventListener('message', stateUpdaterFn, false);
};

/**
 * Removes the event listener responsible for sending messages to the Payment Gateway.
 *
 * @param stateUpdaterFn - Callback that is executed when the messages are sent
 * between iframe and Payment Gateway.
 *
 * @example using functional components
 *
 * ```ts
 * import {
 *    initialState,
 *    removePaymentGatewayListener,
 *    paymentGatewayReducer,
 *    getOperationResult
 * } from '@farfetch/blackout-react/payments';
 *
 * import React, { useEffect, useReducer } from 'react';
 *
 * // create reducer to handle state
 * const [paymentGatewayState, paymentGatewayDispatch] = useReducer(
 *    paymentGatewayReducer,
 *    initialState
 * );
 *
 * // remove listener
 * useEffect(() => {
 *    const listenerFn = getOperationResult(paymentGatewayDispatch);
 *    (...)
 *    return () => {
 *      removePaymentGatewayListener(paymentGatewayDispatch);
 *    };
 * }, []);
 * ```
 */
export const removePaymentGatewayListener = (
  stateUpdaterFn: PaymentGatewayListenerCallbackFunction,
) => {
  window.removeEventListener('message', stateUpdaterFn, false);
};

/**
 * Creates an instrument through the Payment Gateway.
 *
 * @param paymentGatewayUrl - The `targetOrigin` for the iframe, i.e. the domain on which
 * the Payment Gateway is being called of. For more info, check
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage.
 * @param props - Additional custom properties for the PaymentGateway component iframe. With this
 * you can, assign a custom id to the rendered iframe.
 *
 * @example
 *
 * createInstrument('https://domain.farfetch.com');
 *
 */
export const createInstrument = (
  paymentGatewayUrl: string,
  props?: CreateInstrumentProps,
) => {
  const pgwId = props?.elementId || ID;
  const iframe = document.getElementById(pgwId) as HTMLIFrameElement;

  iframe?.contentWindow?.postMessage(
    {
      action: OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT,
    },
    paymentGatewayUrl,
  );
};
