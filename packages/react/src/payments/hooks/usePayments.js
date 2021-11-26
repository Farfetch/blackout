/**
 * Hook to provide all kinds of data for the business logic attached to payments.
 *
 * @module usePayments
 * @category Payments
 * @subcategory Hooks
 */
import * as headers from '../../helpers/headers';
import * as selectors from '@farfetch/blackout-redux/payments/selectors';
import {
  createInstruments,
  fetchInstruments,
  removeInstrument,
  updateInstruments,
} from '@farfetch/blackout-redux/payments';
import { useAction } from '../../helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const INSTRUMENT_MAPPING = {
  CreditCard: 'CreditCard', // Used to create instruments with tokens.
  PayPalExp: 'PayPal',
};

/**
 * @typedef {object} Data
 * @property {string} [order] - Order to iterate over. Send nothing if you just need the actions.
 * @property {string} [user]  - User to iterate over. Send nothing if you just need the actions.
 */

/**
 * @function usePayments
 * @memberof module:payments/hooks
 *
 * @param {Data} data - Object containing the necessary info to use inside the hook.
 *
 * @returns {object} All the handlers, state, actions and relevant data needed to manage payments-related operations.
 */
export default ({ order, user }) => {
  // Selectors
  const instruments = useSelector(state => selectors.getInstruments(state));
  const isInstrumentsLoading = useSelector(selectors.isInstrumentsLoading);
  const isInstrumentsError = useSelector(selectors.getInstrumentsError);
  // Actions
  const createInstrument = useAction(createInstruments);
  const deleteInstrument = useAction(removeInstrument);
  const getInstruments = useAction(fetchInstruments);
  const updateInstrument = useAction(updateInstruments);

  const customRequestConfig = useMemo(
    () => ({
      headers: {
        [headers.ACCEPT_LANGUAGE]: order.shippingAddress?.country.culture,
        [headers.FF_COUNTRY]: order.shippingAddress?.country.alpha2Code,
        [headers.FF_CURRENCY]: order.currency,
      },
    }),
    [order.currency, order.shippingAddress],
  );

  /**
   * Automatically creates an instrument.
   *
   * @function handleCreateInstrument
   * @param {object} [data]                   - Relevant data for the instrument.
   * @param {string} [data.email=user.email]  - Email associated with the instrument.
   * Defaults to the email of the user that instantiated the hook.
   * @param {string} [data.option]            - Payment method.
   * @param {string} [data.tokenId]           - Token id to use. Defaults to null.
   * @param {...any} remainingArgs
   */
  const handleCreateInstrument = async (
    { email = user?.email, option, tokenId = null },
    ...remainingArgs
  ) => {
    const payer = {
      id: user?.id,
      firstName: order?.billingAddress?.firstName || user?.firstName,
      lastName: order?.billingAddress?.lastName || user?.lastName,
      email,
      address: order.billingAddress,
    };
    const amounts = [{ value: order?.grandTotal }];

    const data = {
      method: INSTRUMENT_MAPPING[option] || option,
      option,
      createToken: false,
      payer,
      amounts,
    };

    if (tokenId) {
      data.token = tokenId;
    }

    await createInstrument(
      order.paymentIntentId,
      data,
      customRequestConfig,
      ...remainingArgs,
    );
  };

  /**
   * Automatically deletes an instrument.
   *
   * @function handleDeleteInstrument
   * @param {string} [instrumentId]           - The id of the instrument to be removed.
   * @param {...any} remainingArgs
   */
  const handleDeleteInstrument = async (instrumentId, ...remainingArgs) => {
    await deleteInstrument(
      order.paymentIntentId,
      instrumentId,
      customRequestConfig,
      ...remainingArgs,
    );
  };

  /**
   * Automatically updates an instrument.
   *
   * @function handleUpdateInstrument
   * @param {string} [intentId]               - The id of the intent to be updated.
   * @param {string} [instrumentId]           - The id of the instrument to be updated.
   * @param {object} [data]                   - Relevant data for the instrument.
   * @param {string} [data.email=user.email]  - Email associated with the instrument.
   * Defaults to the email of the user that instantiated the hook.
   * @param {...any} remainingArgs
   */
  const handleUpdateInstrument = async (
    intentId,
    instrumentId,
    { email = user?.email },
    ...remainingArgs
  ) => {
    const payer = {
      id: user?.id,
      firstName: order?.billingAddress?.firstName || user?.firstName,
      lastName: order?.billingAddress?.lastName || user?.lastName,
      email,
      address: order?.billingAddress,
    };

    const amounts = [{ value: order?.grandTotal }];

    const data = {
      createToken: false,
      payer,
      amounts,
    };

    await updateInstruments(
      intentId,
      instrumentId,
      data,
      customRequestConfig,
      ...remainingArgs,
    );
  };

  return {
    instruments: useMemo(
      () => instruments && Object.values(instruments),
      [instruments],
    ),
    isInstrumentsLoading,
    isInstrumentsError,
    createInstrument,
    deleteInstrument,
    getInstruments,
    updateInstrument,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:usePayments~handleCreateInstrument|handleCreateInstrument} method
     */
    handleCreateInstrument,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:usePayments~handleDeleteInstrument|handleDeleteInstrument} method
     */
    handleDeleteInstrument,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:usePayments~handleUpdateInstrument|handleUpdateInstrument} method
     */
    handleUpdateInstrument,
  };
};
