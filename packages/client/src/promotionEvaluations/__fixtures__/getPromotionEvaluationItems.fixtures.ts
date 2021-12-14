import join from 'proper-url-join';
import moxios from 'moxios';
import type { PromotionEvaluationId, PromotionEvaluationItem } from '../types';

export default {
  success: (params: {
    promotionEvaluationId: PromotionEvaluationId;
    response: Array<PromotionEvaluationItem>;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/promotionEvaluations',
        params.promotionEvaluationId,
        'promotionEvaluationItems',
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { promotionEvaluationId: PromotionEvaluationId }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/promotionEvaluations',
        params.promotionEvaluationId,
        'promotionEvaluationItems',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
