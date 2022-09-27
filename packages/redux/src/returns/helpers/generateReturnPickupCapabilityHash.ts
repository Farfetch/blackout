import type { Return } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the return pickup capability parameters.
 *
 * @param returnId  - The return identifier.
 * @param pickupDay - The pickup day.
 *
 * @returns The hash created.
 */
const generateReturnPickupCapabilityHash = (
  returnId: Return['id'],
  pickupDay: string,
) => `${returnId}|${pickupDay}`;

export default generateReturnPickupCapabilityHash;
