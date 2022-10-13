import { buildIconLinks, buildLinks, buildMetas } from '../seoMetadata';
import {
  mockBuildIconLinksResult,
  mockBuildLinksResult,
  mockDefaultAppLinks,
  mockedBuildMetasResult,
  mockSeo,
} from './__fixtures__/metadata';

describe('buildMetas()', () => {
  it('should build metas with only seo', () => {
    const builtMetas = buildMetas(mockSeo, []);
    expect(builtMetas).toStrictEqual(mockedBuildMetasResult);
  });

  it('should build metas with seo and metas param', () => {
    const builtMetas = buildMetas(mockSeo, [
      { name: 'description', content: 'another meta' },
    ]);

    expect(builtMetas).toStrictEqual([
      ...mockedBuildMetasResult,
      {
        content: 'another meta',
        name: 'description',
      },
    ]);
  });
});

describe('buildIconLinks()', () => {
  it('should build icon links', () => {
    const builtMetas = buildIconLinks(mockDefaultAppLinks);
    expect(builtMetas).toStrictEqual(mockBuildIconLinksResult);
  });
});

describe('buildLinks()', () => {
  it('should build links', () => {
    const builtMetas = buildLinks(mockSeo, mockDefaultAppLinks, [
      { href: 'https://mockUrl.com', hreflang: 'mockHrefLang', rel: 'mockRel' },
    ]);
    expect(builtMetas).toStrictEqual(mockBuildLinksResult);
  });
});
