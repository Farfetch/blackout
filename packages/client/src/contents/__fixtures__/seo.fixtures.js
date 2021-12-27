import { rest } from 'msw';

const path = '/api/seo/metadata';

/**
 * Response payloads.
 */
export default {
  get: {
    /**
     * Success moxios request.
     *
     * @param {object} response - SEO payload.
     */
    success: response =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    /**
     * Failure msw request.
     */
    failure: () =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
