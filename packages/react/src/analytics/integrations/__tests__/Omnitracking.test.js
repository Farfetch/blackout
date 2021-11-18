import { postTrackings } from '@farfetch/blackout-core/analytics/integrations/Omnitracking/client';
import analyticsPageData from '../__fixtures__/analyticsPageData.fixtures';
import analyticsTrackData from '../__fixtures__/analyticsTrackData.fixtures';
import Omnitracking from '../Omnitracking';
import OmnitrackingCore from '@farfetch/blackout-core/analytics/integrations/Omnitracking/Omnitracking';
import UniqueViewIdStorage from '../Omnitracking/storage/UniqueViewIdStorage';
import UniqueViewIdStorageOptions from '../Omnitracking/storage/UniqueViewIdStorageOptions';

jest.mock(
  '@farfetch/blackout-core/analytics/integrations/Omnitracking/client',
  () => ({
    ...jest.requireActual(
      '@farfetch/blackout-core/analytics/integrations/Omnitracking/client',
    ),
    postTrackings: jest.fn(),
  }),
);

const mockUrl = 'https://api.blackout.com/en-pt/shopping/woman/gucci';
const mockUniqueViewId = 'd76e46e0-39ee-49b2-bdcd-e550e51fa8f2';

describe('Omnitracking', () => {
  let storage = new UniqueViewIdStorage(UniqueViewIdStorageOptions.default());

  beforeEach(() => {
    storage.clear();
  });

  describe('Class methods setup', () => {
    it('Should be ready to load', () => {
      expect(Omnitracking.shouldLoad()).toEqual(true);
    });

    it('Should extend Omnitracking class from @farfetch/blackout-core', () => {
      expect(Omnitracking.createInstance()).toBeInstanceOf(OmnitrackingCore);
    });

    it('Should return an instance of it in .createInstance()', () => {
      expect(Omnitracking.createInstance()).toBeInstanceOf(Omnitracking);
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
        const omnitrackingInstance = Omnitracking.createInstance({});

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
          const omnitrackingInstance = Omnitracking.createInstance({});

          // Assert
          expect(omnitrackingInstance.currentUniqueViewId).toBe(null);
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
        Omnitracking.createInstance({});

        // Assert
        expect(newStorage.get(mockUrl)).toBe(null);
      });
    });
  });

  describe('Tracking', () => {
    describe('Page views', () => {
      it('Should persist the newly generated uniqueViewId in storage', async () => {
        // Arrange
        const omnitrackingInstance = Omnitracking.createInstance({});

        Object.defineProperty(window, 'location', {
          value: { href: mockUrl },
        });

        // Act
        await omnitrackingInstance.track(analyticsPageData);

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

        const omnitrackingInstance = Omnitracking.createInstance({});

        // Act
        await omnitrackingInstance.track(analyticsPageData);

        // Assert
        expect(postTrackings).toHaveBeenCalledWith(
          expect.objectContaining({
            parameters: expect.objectContaining({
              previousUniqueViewId: mockUniqueViewId,
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

        const omnitrackingInstance = Omnitracking.createInstance({});

        // Act
        await omnitrackingInstance.track(analyticsTrackData);

        // Assert
        expect(storage.get(mockUrl)).toBe(null);
      });
    });
  });
});
