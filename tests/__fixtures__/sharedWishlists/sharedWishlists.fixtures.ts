export const mockSharedWishlistId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const mockWishlistItemId = 481426747;
export const mockProductId = 11766695;

export const mockSharedWishlistItem = {
  id: mockWishlistItemId,
  productId: mockProductId,
  productName: '251 sneakers',
  quantity: 2,
  createdByStaffMemberId: null,
  dateCreated: '2022-11-24T15:14:43.319Z',
  brandId: 10533,
  brandName: 'Valentino',
};

export const mockSharedWishlistsResponse = {
  id: mockSharedWishlistId,
  name: 'string',
  description: 'string',
  hasMissingItems: false,
  dateCreated: '2022-11-24T15:14:43.319Z',
  items: [mockSharedWishlistItem],
};

export const mockSharedWishlistPostData = {
  wishlistId: 'b1a13891-6084-489f-96ed-300eed45b948',
  wishlistSetId: '77fae745-7608-4b7d-8e7d-4f6923e032ef',
};
