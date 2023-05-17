import type { EventData, TrackTypesValues } from '../types/analytics.types.js';

/**
 * Returns the customer id for tracking of the passed user instance.
 *
 * @param user - The user instance.
 *
 * @returns The formatted customer ID.
 */
export default function getCustomerIdFromUser(
  user: EventData<TrackTypesValues>['user'],
): string {
  const customerId = user.id;
  const isGuest = user.traits?.isGuest;

  return customerId && isGuest ? `g_${customerId}` : `${customerId}`;
}
