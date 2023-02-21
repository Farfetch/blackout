import { getPromotionEvaluationItems } from '..';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPromotionEvaluationItems.fixtures';
import mswServer from '../../../tests/mswServer';

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
