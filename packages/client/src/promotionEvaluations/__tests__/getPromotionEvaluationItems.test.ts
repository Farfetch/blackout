import { getPromotionEvaluationItems } from '..';
import {
  mockPromotionEvaluationId,
  mockPromotionEvaluationsItemsResponse,
} from 'tests/__fixtures__/promotionEvaluations';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPromotionEvaluationItems.fixtures';
import moxios from 'moxios';

describe('getPromotionEvaluationItems()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = mockPromotionEvaluationsItemsResponse;

    fixtures.success({
      promotionEvaluationId: mockPromotionEvaluationId,
      response,
    });

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      promotionEvaluationId: mockPromotionEvaluationId,
    });

    await expect(
      getPromotionEvaluationItems(mockPromotionEvaluationId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/promotionEvaluations/${mockPromotionEvaluationId}/promotionEvaluationItems`,
      expectedConfig,
    );
  });
});
