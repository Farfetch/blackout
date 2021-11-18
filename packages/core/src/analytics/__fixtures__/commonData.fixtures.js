export const mockCommonData = {
  uuid: 'd3238414-e68c-4881-97d0-e2549a7f1f80',
  timestamp: 1567010265879,
  userLocalId: 'd9864a1c112d-47ff-8ee4-968c-5acecae23',
};

export const expectedCommonParameters = {
  clientTimestamp: new Date(mockCommonData.timestamp).toJSON(),
  uuid: mockCommonData.uuid,
  uniqueViewId: null,
};
