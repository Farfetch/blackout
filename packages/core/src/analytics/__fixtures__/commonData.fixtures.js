export const mockAnalyticsUniqueEventId =
  '111945ad-b9d4-4c21-b3b0-2764b31bd1111';

export const mockCommonData = {
  __uniqueEventId: mockAnalyticsUniqueEventId,
  timestamp: 1567010265879,
  userLocalId: 'd9864a1c112d-47ff-8ee4-968c-5acecae23',
};

export const expectedCommonParameters = {
  clientTimestamp: new Date(mockCommonData.timestamp).toJSON(),
  uuid: mockAnalyticsUniqueEventId,
  uniqueViewId: null,
};
