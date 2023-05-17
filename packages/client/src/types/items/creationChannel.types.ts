export enum OrderItemCreationChannel {
  Catalog = 'Catalog',
  Mail = 'Mail',
  Phone = 'Phone',
}

// Remove this enum when the `getGuestOrderLegacy` endpoint is removed
export enum OrderItemCreationChannelLegacy {
  Catalog,
  Mail,
  Phone,
}
