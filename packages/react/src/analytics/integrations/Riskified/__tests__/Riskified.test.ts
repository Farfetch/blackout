import {
  integrations,
  type StrippedDownAnalytics,
  type TrackType,
  utils,
} from '@farfetch/blackout-analytics';
import {
  loadIntegrationData,
  pageEventsData,
} from 'tests/__fixtures__/analytics/index.mjs';
import { merge } from 'lodash-es';
import Riskified from '../index.js';
import type { RiskifiedIntegrationOptions } from '../types/index.js';

const defaultEventData = pageEventsData.homepage;

utils.logger.warn = jest.fn();

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: (type: TrackType) =>
    Promise.resolve({ ...loadIntegrationData, type }),
};

describe('Riskified', () => {
  const defaultKey = 'defaultShop.com';
  const baseUrl = (key?: string) =>
    `https://beacon.riskified.com?shop=${key || defaultKey}&sid=`;
  const localId = loadIntegrationData.user.localId;

  describe('Riskified Integration', () => {
    let instance: Riskified;
    const options: RiskifiedIntegrationOptions = {
      shop: 'myShop',
    };

    beforeEach(() => {
      instance = Riskified.createInstance(
        options,
        loadIntegrationData,
        strippedDownAnalytics,
      ) as Riskified;
    });

    it('Should extend the abstract class `Integration`', () => {
      expect(Riskified.prototype).toBeInstanceOf(integrations.Integration);
    });

    it('Should be ready to load by default', () => {
      expect(Riskified.shouldLoad()).toBe(true);
    });

    it('Should have a base URL defined', () => {
      expect(instance.baseUrl).toEqual(baseUrl(options.shop));
    });

    it('Should set the script and append it to the DOM', () => {
      const script: HTMLScriptElement | null = document.querySelector(
        '[data-test="riskified"]',
      );

      expect(script).toBeDefined();
      expect(script?.async).toBe(true);
      expect(script?.src.endsWith(localId)).toBeTruthy();
    });

    it('Should call `RISKX.go` if the integration is ready', async () => {
      const data = merge(defaultEventData, {
        context: {
          web: {
            window: {
              location: {
                href: 'http://localhost',
              },
            },
          },
        },
        user: {
          localId,
        },
      });
      const spy = jest.fn();

      window.RISKX = {
        go: spy,
      };

      instance.onLoad();

      await instance.track(data);

      expect(spy).toHaveBeenCalledWith(data.context.web.window.location.href);
    });

    it('Should not call `RISKX.go` if the integration is not ready.', () => {
      const data = merge(defaultEventData, {
        properties: {
          location: {
            href: 'http://localhost',
          },
        },
        user: {
          localId,
        },
      });
      const spy = jest.fn();

      window.RISKX = {
        go: spy,
      };

      instance.track(data);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Riskified Integration Options', () => {
    it('Should return an error when shop is not set on Riskified Options.', () => {
      expect(() => {
        Riskified.createInstance(
          // @ts-expect-error try loading Riskified without passing shop
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        );
      }).toThrow(
        "[Riskified] - `shop` parameter was not provided in options. It's mandatory to load Riskified Integration.",
      );
    });
  });
});
