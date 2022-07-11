/**
 * Hook to provide all kinds of data for the business logic attached to payments.
 *
 */
import * as headers from '../../helpers/headers';
import * as selectors from '@farfetch/blackout-redux/payments/selectors';
import {
  createInstruments,
  fetchInstruments,
  removeInstrument,
  updateInstruments,
} from '@farfetch/blackout-redux/payments';
import {
  HandleCreateInstrumentProps,
  HandleDeleteInstrumentProps,
  HandleUpdateInstrumentProps,
  INSTRUMENT_MAPPING,
  UsePayments,
} from './types';
import { useAction } from '../../helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { PostInstrumentsData } from '@farfetch/blackout-client/payments/types';

/**
 * @param data - Object containing the necessary info to use inside the hook.
 *
 * @returns    All the handlers, state, actions and relevant data needed to manage payments-related operations.
 */
const usePayments: UsePayments = ({ order, user }) => {
  // Selectors
  const instruments = useSelector(state => selectors.getInstruments(state));
  const isInstrumentsLoading = useSelector(selectors.isInstrumentsLoading);
  const instrumentsError = useSelector(selectors.getInstrumentsError);
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
   * @param data - Relevant data for the instrument.
   * @param remainingArgs
   */
  const handleCreateInstrument: HandleCreateInstrumentProps = async (
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

    const data: Partial<PostInstrumentsData> = {
      method:
        INSTRUMENT_MAPPING[option as keyof typeof INSTRUMENT_MAPPING] || option,
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
   * @param instrumentId      - The id of the instrument to be removed.
   * @param remainingArgs
   */
  const handleDeleteInstrument: HandleDeleteInstrumentProps = async (
    instrumentId,
    ...remainingArgs
  ) => {
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
   * @param intentId             - The id of the intent to be updated.
   * @param instrumentId         - The id of the instrument to be updated.
   * @param data                 - Relevant data for the instrument.
   * @param remainingArgs
   */
  const handleUpdateInstrument: HandleUpdateInstrumentProps = async (
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

    await updateInstrument(
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
    instrumentsError,
    createInstrument,
    deleteInstrument,
    getInstruments,
    updateInstrument,
    /**
     *
     * @see {@link "handleCreateInstrument"} method
     */
    handleCreateInstrument,
    /**
     *
     * @see {@link "handleDeleteInstrument"} method
     */
    handleDeleteInstrument,
    /**
     *
     * @see {@link "handleUpdateInstrument"} method
     */
    handleUpdateInstrument,
  };
};

export default usePayments;
