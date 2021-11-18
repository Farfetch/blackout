import join from 'proper-url-join';
import moxios from 'moxios';

const baseUrl = 'https://api.blackandwhite-ff.com/content/v1/spaces';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        baseUrl,
        params.spaceCode,
        'contents',
        params.contentId,
        'versions',
        params.versionId,
        'publications',
        params.publicationId,
      ),
      {
        method: 'patch',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        baseUrl,
        params.spaceCode,
        'contents',
        params.contentId,
        'versions',
        params.versionId,
        'publications',
        params.publicationId,
      ),
      {
        method: 'patch',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
