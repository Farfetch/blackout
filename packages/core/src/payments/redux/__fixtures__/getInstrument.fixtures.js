import { mockGetInstrumentsResponse } from './getInstruments.fixtures';

export const mockGetInstrumentResponse = mockGetInstrumentsResponse[0];

export const mockGetInstrumentNormalizedPayload = {
  entities: {
    instruments: {
      [mockGetInstrumentResponse.id]: mockGetInstrumentResponse,
    },
  },
  result: mockGetInstrumentResponse.id,
};
