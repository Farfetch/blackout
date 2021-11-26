import {
  UPDATE_INSTRUMENT_FAILURE,
  UPDATE_INSTRUMENT_REQUEST,
  UPDATE_INSTRUMENT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  Instrument,
  Intent,
  PutInstruments,
  PutInstrumentsData,
} from '@farfetch/blackout-client/payments/types';
import type { UpdateInstrumentAction } from '../../types';

/**
 * @typedef {object} City
 * @property {number} id - City id.
 * @property {string} name - City name.
 * @property {string} stateId - City state id.
 * @property {string} countryId - City country id.
 */

/**
 * @typedef {object} State
 * @property {number} id - State id.
 * @property {string} code - State code.
 * @property {string} name - State name.
 * @property {string} countryId - State country id.
 */

/**
 * @typedef {object} Country
 * @property {object} id - Country id.
 * @property {object} name - Country name.
 * @property {object} nativeName - Country native name.
 * @property {object} alpha2Code - Country alpha 2 code.
 * @property {object} alpha3Code - Country alpha 3 code.
 * @property {object} culture - Country culture.
 * @property {object} region - Country region.
 * @property {object} subRegion - Country sub region.
 * @property {object} regionId - Country region id.
 * @property {object} subfolder - Country subfolder.
 * @property {object} continentId - Country continent id.
 */

/**
 * @typedef {object} Continent
 * @property {number} id - Continent id.
 * @property {string} name - Continent name.
 * @property {Array<Country>} countries - Continent countries data.
 */

/**
 *
 * @typedef {object} Address
 * @property {string} addressLine1 - Address line 1.
 * @property {string} addressLine2 - Address line 2.
 * @property {string} addressLine3 - Address line 3.
 * @property {string} vatNumber - Address vat number.
 * @property {string} zipCode - Address zip code.
 * @property {string} phone - Address phone.
 * @property {string} neighbourhood -Address neighbourhood.
 * @property {string} ddd - Address ddd.
 * @property {City} city - Address city.
 * @property {State} state - Address state data.
 * @property {Country} country - Address country data.
 * @property {Continent} continent - Continent data.
 */

/**
 * @typedef {object} Payer
 * @property {string} id - Payer id.
 * @property {string} firstName - Payer first name.
 * @property {string} lastName - Payer last name.
 * @property {string} email - Payer email.
 * @property {Address} address - Payer address data.
 */

/**
 * @typedef {object} Amount
 * @property {number} value - Amount value.
 * @property {number} settledValue - Amount value of the instrument that was settled.
 * @property {number} refundedValue - Amount value of the instrument that was refunded.
 */

/**
 * @typedef {object} UpdateInstrumentsData
 * @property {boolean} createToken - Create token.
 * @property {Payer} payer - Payer data.
 * @property {Array<Amount>} amounts - Amounts data.
 * @property {('Ecommerce'|'Moto'|'Pos')} shopperInteraction - Specifies the interaction that shopper gives their payment details.
 * @property {('Provided'|'CheckoutOrderBillingAddress')} payerAddressType - Payer address type.
 */

/**
 * @callback UpdateInstrumentsThunkFactory
 * @param {string} intentId - Id of the payment Intent.
 * @param {string} instrumentId - Id of the payment Instrument.
 * @param {UpdateInstrumentsData} data - Instrument object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating an instrument.
 *
 * @function updateInstrumentsFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} putInstruments - Put instruments client.
 *
 * @returns {UpdateInstrumentsThunkFactory} Thunk factory.
 */
const updateInstrumentsFactory =
  (putInstruments: PutInstruments) =>
  (
    intentId: Intent['id'],
    instrumentId: Instrument['id'],
    data: PutInstrumentsData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<UpdateInstrumentAction>): Promise<void> => {
    dispatch({
      type: UPDATE_INSTRUMENT_REQUEST,
    });

    try {
      const result = await putInstruments(intentId, instrumentId, data, config);

      dispatch({
        type: UPDATE_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default updateInstrumentsFactory;
