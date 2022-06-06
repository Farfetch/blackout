import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { PickupCapabilities } from '../types/pickupCapabilities.types';

export default {
  success: (params: {
    id: number;
    pickupDay: string;
    response: PickupCapabilities[];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        params.id,
        'pickupcapabilities/',
        params.pickupDay,
      ),
      {
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: (params: { id: number; pickupDay: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/returns',
        params.id,
        'pickupcapabilities/',
        params.pickupDay,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
