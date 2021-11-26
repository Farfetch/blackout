import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostInstruments } from './types';

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
 * @typedef {object} CreditCardData
 * @property {string} cardHolderName - Name printed on the credit card.
 * @property {string} cardNumber - Number of the credit card.
 * @property {number} cardExpiryMonth - Month of the Gregorian calendar
 * when the credit card expires, as a number between 1 and 12.
 * @property {number} cardExpiryYear - Year of the Gregorian calendar
 * when the credit card expires.
 * @property {string} cardCvv - Card Verification Value,
 * typically printed in the back of the credit card.
 * @property {string} giftCardNumber - Number of the gift card.
 * @property {string} giftCardCsc - Card Security Code of the gift card.
 * @property {string} creditUserId - Identifier of the user that pay with credit.
 */

/**
 * @typedef {object} PostInstrumentsData
 *
 * @alias PostInstrumentsData
 * @memberof module:payments/client
 *
 * @property {string} method - Method.
 * @property {string} option - Option.
 * @property {string} token - Token.
 * @property {boolean} createToken - Create token.
 * @property {('Provided'|'CheckoutOrderBillingAddress')} payerAddressType - Payer address type.
 * @property {Payer} payer - Payer data.
 * @property {Array<Amount>} amounts - Amounts data.
 * @property {CreditCardData} data - Represents variable instrument data by payment method.
 * @property {('Ecommerce'|'Moto'|'Pos')} shopperInteraction - Specifies the interaction that shopper gives their payment details.
 */

/**
 * Method responsible for creating an instrument.
 *
 * @function postInstruments
 * @memberof module:payments/client
 *
 * @param {string} id                 - Id of the payment intent.
 * @param {PostInstrumentsData} data  - Request data.
 * @param {object} [config]           - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postInstruments: PostInstruments = (id, data, config) =>
  client
    .post(join('/payment/v1/intents', id, 'instruments'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postInstruments;
