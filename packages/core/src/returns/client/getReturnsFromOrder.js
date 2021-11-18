import { adaptDate } from '../../helpers/adapters';
import client, { adaptError } from '../../helpers/client';
import isString from 'lodash/isString';
import join from 'proper-url-join';

export const adaptDateFormat = value => `/Date(${adaptDate(value)})/`;

export const adaptReferenceName = value => {
  switch (value) {
    case 'None':
      return 0;
    case 'ReturnNote':
      return 1;
    case 'ReturnCustomerRequestedAWB':
      return 2;
    case 'ReturnLabelAWB':
      return 3;
    case 'DropOffLocationsPage':
      return 4;
    default:
      return null;
  }
};

export const adaptItemStatus = value => {
  switch (value) {
    case 'Created':
      return 0;
    case 'AcceptedWithShippingCosts':
      return 1;
    case 'AcceptedWithoutShippingCosts':
      return 2;
    case 'Contested':
      return 3;
    case 'ContestAccepted':
      return 4;
    case 'Canceled':
      return 5;
    default:
      return null;
  }
};

export const adaptCourier = value => {
  switch (value) {
    case 'NotKnown':
      return 0;
    case 'DHL':
      return 1;
    case 'UPS':
      return 2;
    default:
      return null;
  }
};

export const adaptStatus = value => {
  switch (value) {
    case 'Created':
      return 0;
    case 'AwaitingPickup':
      return 1;
    case 'InTransit':
      return 2;
    case 'Accepted':
      return 3;
    case 'PartialAccepted':
      return 4;
    case 'Refused':
      return 5;
    case 'Canceled':
      return 6;
    case 'NeedPickupSchedule':
      return 7;
    default:
      return null;
  }
};

export const adaptType = value => {
  switch (value) {
    case 'Courier':
      return 0;
    case 'InStore':
      return 1;
    case 'CourierDropOff':
      return 2;
    case 'CourierPickUp':
      return 3;
    case 'Manual':
      return 4;
    default:
      return null;
  }
};

export const compatibilityAdapter = res => {
  return !!res?.map
    ? res?.map(r => ({
        ...r,
        availableDates: r?.availableDates?.map(dt => adaptDateFormat(dt)),
        createdDate: adaptDateFormat(r?.createdDate),
        maximumDateForPickup: adaptDateFormat(r?.maximumDateForPickup),
        pickupSchedule: r?.pickupSchedule
          ? {
              start: adaptDateFormat(r?.pickupSchedule?.start),
              end: adaptDateFormat(r?.pickupSchedule?.end),
            }
          : r?.pickupSchedule,
        type: adaptType(r?.type),
        status: adaptStatus(r?.status),
        courier: adaptCourier(r?.courier),
        items: r?.items?.map(item => ({
          ...item,
          status: adaptItemStatus(item?.status),
        })),
        references: r?.references?.map(ref => ({
          ...ref,
          name: adaptReferenceName(ref?.name),
        })),
        userPickupAddress: {
          ...r?.userPickupAddress,
          createdDate: adaptDateFormat(r?.userPickupAddress?.createdDate),
        },
      }))
    : {};
};

/**
 * @typedef {object} GetReturnsFromOrderQuery
 *
 * @alias GetReturnsFromOrderQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining returns from a specific order.
 *
 * @function getReturnsFromOrder
 * @memberof module:returns/client
 *
 * @param {string} orderId - Order identifier.
 * @param {GetReturnsFromOrderQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, query, config) => {
  const guestUserEmail = query?.guestUserEmail;
  const containsGuestUserEmail = !!guestUserEmail && isString(guestUserEmail);
  const args = containsGuestUserEmail
    ? [join('/legacy/v1/orderreturns', orderId, { query }), config]
    : [join('/account/v1/orders', orderId, 'returns', { query }), config];

  return client
    .get(...args)
    .then(response =>
      containsGuestUserEmail
        ? response.data
        : compatibilityAdapter(response?.data),
    )
    .catch(error => {
      throw adaptError(error);
    });
};
