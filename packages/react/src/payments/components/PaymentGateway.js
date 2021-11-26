import * as constants from './constants';
import IFrame from 'react-iframe';
import React from 'react';

/**
 * Payment Gateway component.
 * Renders an IFrame component based on the passed props.
 *
 * @component
 * @memberof module:payments/components
 *
 * @param   {object} props - All props needed for the component.
 *
 * @returns {Node} - A registered component.
 *
 * @example
 * import { PaymentGateway } from '@farfetch/blackout-react/payments';
 * @example
 * <PaymentGateway
 *    paymentIntentId="0f9e8b73-8d08-49e7-8335-4e4d6db58540"
 *    staticName="whitelabel"
 *    folderName="pg-12"
 *    locale={getLocaleFromSubfolder()}
 * />
 *
 */
const PaymentGateway = props => {
  const {
    OPERATION_SOURCE,
    OPERATION_TYPE,
    initialState,
    paymentGatewayReducer,
    ...rest
  } = constants;

  // overriding the default config with the ones passed via props
  const cfg = { ...rest, ...props };

  cfg.url = `${cfg.url}?paymentIntentId=${cfg.paymentIntentId}&staticName=${cfg.staticName}&folderName=${cfg.folderName}&locale=${cfg.locale}`;

  return <IFrame {...cfg}></IFrame>;
};

/**
 * Sets state according to the operation performed by the Payment Gateway.
 *
 * @function
 * @memberof module:payments/components
 *
 * @param   {Event} event - Event.
 * @param   {Function} stateUpdaterFn - State updater.
 *
 */
export const getOperationResult = (event, stateUpdaterFn) => {
  const { OPERATION_SOURCE, OPERATION_TYPE } = constants;

  if (typeof window === 'undefined') {
    return;
  }

  const data = event?.data;
  const source = data?.source;

  if (source !== OPERATION_SOURCE) {
    return;
  }

  const operation = data?.operation;

  if (operation === OPERATION_TYPE.VALIDATION) {
    stateUpdaterFn({ isFormValid: data?.isFormValid });
  }

  const payload = data?.payload;
  const payloadStatus = payload?.info?.status;
  const payloadData = payload?.data;
  const paymentData = payloadData?.paymentData;

  if (operation === OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT) {
    if (payloadStatus && payloadData) {
      stateUpdaterFn({
        instrumentId: paymentData,
        instrumentAdded: true,
      });
    }
  }
};

/**
 * Registers a listener.
 * Compatible with Class Components and Functional Components.
 *
 * @function
 * @memberof module:payments/components
 *
 * @param   {Function} stateUpdaterFn - State updater.
 *
 * @example
 * // using class components
 *
 * @example
 *
 * import {
 *    addPaymentGatewayListener,
 *    paymentGatewayInitialState
 * } from '@farfetch/blackout-react/payments';
 *
 * // append paymentGatewayInitialState to the component initial state
 * constructor(props) {
 *    this.state = {
 *       ...paymentGatewayInitialState,
 *       ...
 *    }
 *
 *    // bind state handler function
 *    this._handlePaymentGatewayState = this._handlePaymentGatewayState.bind(
 *       this
 *    );
 * }
 *
 * // register listener
 * componentDidMount() {
 *    addPaymentGatewayListener(this._handlePaymentGatewayState);
 *    ...
 * }
 *
 * // state handler function
 * _handlePaymentGatewayState(state) {
 *    this.setState(state);
 * }
 *
 * @example
 * // using functional components
 *
 * @example
 *
 * import {
 *    addPaymentGatewayListener,
 *    paymentGatewayInitialState,
 *    paymentGatewayReducer
 * } from '@farfetch/blackout-react/payments';
 *
 * import React, { useEffect, useReducer } from 'react';
 *
 * // reate reducer to handle state
 * const [paymentGatewayState, paymentGatewayDispatch] = useReducer(
 *    paymentGatewayReducer,
 *    paymentGatewayInitialState
 * );
 *
 * // add listener
 * useEffect(() => {
 *    addPaymentGatewayListener(paymentGatewayDispatch);
 * )};
 *
 */
export const addPaymentGatewayListener = stateUpdaterFn => {
  window.addEventListener(
    'message',
    event => getOperationResult(event, stateUpdaterFn),
    false,
  );
};

/**
 * Registers a listener.
 * Compatible with Class Components and Functional Components.
 *
 * @function
 * @memberof module:payments/components
 *
 * @param   {Function} stateUpdaterFn - State updater.
 *
 * @example
 * // using class components
 *
 * @example
 *
 * import {
 *    removePaymentGatewayListener,
 *    paymentGatewayInitialState
 * } from '@farfetch/blackout-react/payments';
 *
 * // append paymentGatewayInitialState to the component initial state
 * constructor(props) {
 *    this.state = {
 *       ...paymentGatewayInitialState,
 *       ...
 *    }
 *
 *    // bind state handler function
 *    this._handlePaymentGatewayState = this._handlePaymentGatewayState.bind(
 *       this
 *    );
 * }
 *
 * // register listener
 * componentWillUnmount() {
 *    removePaymentGatewayListener(this._handlePaymentGatewayState);
 *    ...
 * }
 *
 * // state handler function
 * _handlePaymentGatewayState(state) {
 *    this.setState(state);
 * }
 *
 * @example
 * // using functional components
 *
 * @example
 *
 * import {
 *    removePaymentGatewayListener,
 *    paymentGatewayInitialState,
 *    paymentGatewayReducer
 * } from '@farfetch/blackout-react/payments';
 *
 * import React, { useEffect, useReducer } from 'react';
 *
 * // reate reducer to handle state
 * const [paymentGatewayState, paymentGatewayDispatch] = useReducer(
 *    paymentGatewayReducer,
 *    paymentGatewayInitialState
 * );
 *
 * // remove listener
 * useEffect(() => {
 *    return () => {
 *      removePaymentGatewayListener(paymentGatewayDispatch);
 *    };
 * }, []);
 *
 */
export const removePaymentGatewayListener = stateUpdaterFn => {
  window.removeEventListener(
    'message',
    event => getOperationResult(event, stateUpdaterFn),
    false,
  );
};

/**
 * Creates an instrument.
 *
 * @function
 * @memberof module:payments/components
 *
 * @param   {object} props - All props needed for the component.
 *
 * @example
 *
 * createInstrument();
 *
 */
export const createInstrument = props => {
  const { OPERATION_TYPE, id } = constants;
  const pgwId = props?.elementId || id;
  const iframe = document.getElementById(pgwId);

  iframe.contentWindow.postMessage(
    {
      action: OPERATION_TYPE.ADD_CREDIT_CARD_INSTRUMENT,
    },
    '*',
  );
};

export default PaymentGateway;
