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
    const response = mockPromotionEvaluationsItemsResponse;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });
});
