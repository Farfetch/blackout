import { ENVIRONMENT_TYPES, VITORINO_PROVIDERS } from '../constants';
import { integrations, utils } from '@farfetch/blackout-core/analytics';
import Vitorino from '../Vitorino';

utils.logger.error = jest.fn();
utils.logger.warn = jest.fn();

const mockLoggerError = utils.logger.error;
const mockLoggerWarn = utils.logger.warn;

describe('Vitorino', () => {
  const Forter = require('../../Forter').default;
  const Riskified = require('../../Riskified').default;

  describe('Vitorino integration', () => {
    it('Should extend the core integration class', () => {
      expect(Vitorino.prototype).toBeInstanceOf(integrations.Integration);
    });

    it('Should be an integration that loads independently of user consent', () => {
      expect(Vitorino.shouldLoad()).toBe(true);
      expect(Vitorino.shouldLoad({ marketing: true })).toBe(true);
    });
  });

  describe('Vitorino instance', () => {
    let spyForter;
    let spyRiskified;

    beforeEach(() => {
      jest.resetModuleRegistry();
      jest.clearAllMocks();

      spyForter = jest.spyOn(Forter, 'createInstance');
      spyRiskified = jest.spyOn(Riskified, 'createInstance');
    });

    it('should not load all instances by default', () => {
      const vitorinoInstance = Vitorino.createInstance();

      expect(vitorinoInstance.options.activeIntegrations).toEqual([
        VITORINO_PROVIDERS.forter,
        VITORINO_PROVIDERS.riskified,
      ]);

      expect(vitorinoInstance.riskified).toBeInstanceOf(
        integrations.Integration,
      );
      expect(vitorinoInstance.forter).toBeInstanceOf(integrations.Integration);
    });

    it('should only load Forter instance', () => {
      const vitorinoInstance = Vitorino.createInstance({
        activeIntegrations: [VITORINO_PROVIDERS.forter],
      });

      expect(vitorinoInstance.riskified).toBeUndefined();
      expect(vitorinoInstance.forter).toBeInstanceOf(integrations.Integration);
    });

    it('Should trigger an error', () => {
      Vitorino.createInstance({
        activeIntegrations: {},
      });

      expect(mockLoggerError).toHaveBeenCalledWith(
        '[Analytics] Vitorino - The value `activeIntegrations` from Vitorino integration options must be an array.',
      );
    });

    it('Should trigger warn about invalid integration settings', () => {
      Vitorino.createInstance({
        forter: ['notValid'],
        riskified: ['notValid'],
      });

      expect(mockLoggerWarn.mock.calls).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            '[Analytics] Vitorino - The value of forter from Vitorino integration options must be an object with forter integration options.',
          ]),
          expect.arrayContaining([
            '[Analytics] Vitorino - The value of riskified from Vitorino integration options must be an object with riskified integration options.',
          ]),
        ]),
      );

      expect(spyForter).toHaveBeenCalledWith(
        {
          environment: ENVIRONMENT_TYPES.dev,
        },
        undefined,
        undefined,
      );
      expect(spyRiskified).toHaveBeenCalledWith(
        {
          environment: ENVIRONMENT_TYPES.dev,
        },
        undefined,
      );
    });

    it('Should return valid options for each integration', () => {
      Vitorino.createInstance({
        genericOption: 'foo',
        environment: ENVIRONMENT_TYPES.prod,
        forter: { forterToken: 'bar' },
        riskified: { riskifiedToken: 'baz' },
      });

      expect(spyForter).toHaveBeenCalledWith(
        {
          genericOption: 'foo',
          forterToken: 'bar',
          environment: ENVIRONMENT_TYPES.prod,
        },
        undefined,
        undefined,
      );
      expect(spyRiskified).toHaveBeenCalledWith(
        {
          genericOption: 'foo',
          riskifiedToken: 'baz',
          environment: ENVIRONMENT_TYPES.prod,
        },
        undefined,
      );
    });
  });

  describe('onSetUser', () => {
    let spyForter;
    let spyRiskified;

    beforeEach(() => {
      jest.resetModuleRegistry();
      jest.clearAllMocks();

      spyForter = jest.spyOn(Forter.prototype, 'onSetUser');
      spyRiskified = jest.spyOn(Riskified.prototype, 'onSetUser');
    });

    it('Should trigger all on set User', async () => {
      const instance = Vitorino.createInstance();

      await instance.onSetUser({});
      expect(spyForter).toHaveBeenCalled();
      expect(spyForter).toHaveBeenCalled();
    });

    it('Should trigger only Forter OnSetUser', async () => {
      const instance = Vitorino.createInstance({
        activeIntegrations: [VITORINO_PROVIDERS.forter],
      });

      await instance.onSetUser({});

      expect(spyForter).toHaveBeenCalled();
      expect(spyRiskified).toHaveBeenCalledTimes(0);
    });
  });

  describe('track', () => {
    let spyForter;
    let spyRiskified;

    beforeEach(() => {
      jest.resetModuleRegistry();
      jest.clearAllMocks();

      spyForter = jest.spyOn(Forter.prototype, 'track');
      spyRiskified = jest.spyOn(Riskified.prototype, 'track');
    });

    it('Should trigger all track functions', async () => {
      const instance = Vitorino.createInstance();

      await instance.track({});
      expect(spyForter).toHaveBeenCalled();
      expect(spyForter).toHaveBeenCalled();
    });

    it('Should trigger only Forter track function', async () => {
      const instance = Vitorino.createInstance({
        activeIntegrations: [VITORINO_PROVIDERS.forter],
      });

      await instance.track({});

      expect(spyForter).toHaveBeenCalled();
      expect(spyRiskified).toHaveBeenCalledTimes(0);
    });
  });
});
