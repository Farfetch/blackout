export type DeleteAddressHandlerData = (address: {
  // The id of the address.
  id: string;
  // If this is the current shipping address.
  isCurrentShipping?: boolean;
  // If this is the current billing address.
  isCurrentBilling?: boolean;
  // If this is the current contact address.
  isCurrentPreferred?: boolean;
}) => Promise<unknown>;
