import {
  pageEventsData as analyticsPageData,
  trackEventsData as analyticsTrackData,
  loadIntegrationData,
} from 'tests/__fixtures__/analytics';
import {
  integrations as coreIntegrations,
  EventTypes,
  PageTypes,
  type PageviewEventData,
  type StrippedDownAnalytics,
} from '@farfetch/blackout-analytics';
import { postTracking } from '@farfetch/blackout-client';
import Omnitracking from '..';
import UniqueViewIdStorage from '../storage/UniqueViewIdStorage';
import UniqueViewIdStorageOptions from '../storage/UniqueViewIdStorageOptions';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postTracking: jest.fn(),
}));

const mockUrl = 'https://api.blackout.com/en-pt/shopping/woman/gucci';
const mockUniqueViewId = 'd76e46e0-39ee-49b2-bdcd-e550e51fa8f2';

const strippedDownAnalytics: StrippedDownAnalytics = {
  createEvent: type => Promise.resolve({ ...loadIntegrationData, type }),
};

describe('Omnitracking', () => {
  const storage = new UniqueViewIdStorage(UniqueViewIdStorageOptions.default());

  beforeEach(() => {
    storage.clear();
  });

  describe('Class methods setup', () => {
    it('Should be ready to load', () => {
      expect(Omnitracking.shouldLoad()).toBe(true);
    });

    it('Should extend Omnitracking class from @farfetch/blackout-client', () => {
      expect(
        Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        ),
      ).toBeInstanceOf(coreIntegrations.Omnitracking);
    });

    it('Should return an instance of it in .createInstance()', () => {
      expect(
        Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        ),
      ).toBeInstanceOf(Omnitracking);
    });
  });

  describe('Constructor', () => {
    describe('UniqueViewIds management', () => {
      it('Should load the uniqueViewId corresponding to the document.referrer value if it exists in storage', () => {
        // Arrange
        storage.set(mockUrl, mockUniqueViewId);

        Object.defineProperty(document, 'referrer', {
          value: mockUrl,
        });

        // Act
        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        ) as Omnitracking;

        // Assert
        expect(omnitrackingInstance.currentUniqueViewId).toBe(mockUniqueViewId);
      });

      it('Should not throw if the document.referrer value does not exist in storage', () => {
        // Arrange
        Object.defineProperty(document, 'referrer', {
          value: mockUrl,
        });

        expect(() => {
          // Act
          const omnitrackingInstance = Omnitracking.createInstance(
            {},
            loadIntegrationData,
            strippedDownAnalytics,
          ) as Omnitracking;

          // Assert
          expect(omnitrackingInstance.currentUniqueViewId).toBeNull();
        }).not.toThrow();
      });

      it('Should try to remove expired items in storage', () => {
        // Arrange
        const newStorage = new UniqueViewIdStorage(
          new UniqueViewIdStorageOptions(
            -UniqueViewIdStorageOptions.MAX_EXPIRES,
            UniqueViewIdStorageOptions.MAX_ITEMS,
          ),
        );

        newStorage.set(mockUrl, mockUniqueViewId);

        // Act
        Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        );

        // Assert
        expect(newStorage.get(mockUrl)).toBeNull();
      });
    });
  });

  describe('Tracking', () => {
    describe('Page views', () => {
      it('Should persist the newly generated uniqueViewId in storage', async () => {
        // Arrange
        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        ) as Omnitracking;

        Object.defineProperty(window, 'location', {
          value: { href: mockUrl },
        });

        // Act
        await omnitrackingInstance.track(
          analyticsPageData[PageTypes.HOMEPAGE] as PageviewEventData,
        );

        // Assert
        expect(storage.get(mockUrl)).toBe(
          omnitrackingInstance.currentUniqueViewId,
        );
      });

      it('Should send the previousUniqueViewId set with the value of document.referrer if it is in storage', async () => {
        // Arrange
        storage.set(mockUrl, mockUniqueViewId);

        Object.defineProperty(document, 'referrer', {
          value: mockUrl,
        });

        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        );

        // Act
        await omnitrackingInstance.track(
          analyticsPageData[PageTypes.HOMEPAGE] as PageviewEventData,
        );

        // Assert
        expect(postTracking).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              previousUniqueViewId: mockUniqueViewId,
            }),
          }),
        );
      });

      it('Should send the correct clientCountry when a subfolder has the {country-language} format', async () => {
        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        );
        const data = analyticsPageData[PageTypes.HOMEPAGE] as PageviewEventData;

        // @ts-ignore
        data.context.web.window.location.pathname = '/en-pt';

        await omnitrackingInstance.track(data);

        expect(postTracking).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: 'PT',
            }),
          }),
        );
      });

      it('Should send the correct clientCountry when a subfolder has the {language} format', async () => {
        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        );
        const data = analyticsPageData[PageTypes.HOMEPAGE] as PageviewEventData;

        // @ts-ignore
        data.context.web.window.location.pathname = '/pt';

        await omnitrackingInstance.track(data);

        expect(postTracking).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              clientCountry: undefined,
            }),
          }),
        );
      });
    });

    describe('Events', () => {
      it('Should track events and not persist the current uniqueViewId value', async () => {
        // Arrange
        Object.defineProperty(window, 'location', {
          value: { href: mockUrl },
        });

        const omnitrackingInstance = Omnitracking.createInstance(
          {},
          loadIntegrationData,
          strippedDownAnalytics,
        ) as Omnitracking;

        // This is only to remove warning 'uniqueViewId not set' when running tests.
        omnitrackingInstance.currentUniqueViewId = 'dummy-unique-view-id';

        // Act
        await omnitrackingInstance.track(
          analyticsTrackData[EventTypes.PRODUCT_VIEWED],
        );

        // Assert
        expect(storage.get(mockUrl)).toBeNull();
      });
    });
  });
});
