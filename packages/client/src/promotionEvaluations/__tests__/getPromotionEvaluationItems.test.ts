import { getPromotionEvaluationItems } from '../index.js';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPromotionEvaluationItems.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getPromotionEvaluationItems()', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPromotionEvaluationsItemsResponse));

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).resolves.toEqual(mockPromotionEvaluationsItemsResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });
});
