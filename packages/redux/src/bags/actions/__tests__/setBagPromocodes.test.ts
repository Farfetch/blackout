import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockBagPromocodesData,
  mockBagPromocodesResponse,
  mockState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import { putBagPromocodes } from '@farfetch/blackout-client';
import { setBagPromocodes } from '..';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  putBagPromocodes: jest.fn(),
}));

const bagMockStore = (state = {}) => mockStore({ bag: INITIAL_STATE }, state);
const expectedConfig = undefined;
const payload = {
  result: mockBagId,
  entities: {
    bagPromocodesInformation: {
      [mockBagId]: mockBagPromocodesResponse.promoCodesInformation,
    },
  },
};

let store: ReturnType<typeof bagMockStore>;

describe('setBagPromocodes() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    store = bagMockStore(mockState);
  });

  it('should create the correct actions when the set bag promocodes procedure fails', async () => {
    const expectedError = new Error('set bag promocodes error');

    (putBagPromocodes as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(
      setBagPromocodes(mockBagId, mockBagPromocodesData)(store.dispatch),
    ).rejects.toThrow(expectedError);
    expect(putBagPromocodes).toHaveBeenCalledTimes(1);
    expect(putBagPromocodes).toHaveBeenCalledWith(
      mockBagId,
      mockBagPromocodesData,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
        },
        {
          payload: {
            error: expectedError,
          },
          type: actionTypes.SET_BAG_PROMOCODES_FAILURE,
        },
      ]),
    );
  });

  it('should create the correct actions for when the set bag promocodes procedure is successful', async () => {
    (putBagPromocodes as jest.Mock).mockResolvedValueOnce(
      mockBagPromocodesResponse,
    );

    await expect(
      setBagPromocodes(mockBagId, mockBagPromocodesData)(store.dispatch),
    ).resolves.toBe(mockBagPromocodesResponse);

    const actionResults = store.getActions();

    expect(putBagPromocodes).toHaveBeenCalledTimes(1);
    expect(putBagPromocodes).toHaveBeenCalledWith(
      mockBagId,
      mockBagPromocodesData,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      {
        type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
      },
      {
        payload,
        type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
      }),
    ).toMatchSnapshot('set bag promocodes success payload');
  });
});
