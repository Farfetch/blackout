import * as selectors from '../index.js';
import {
  mockState,
  mockSubscriptionPackageHash,
} from 'tests/__fixtures__/subscriptions/index.mjs';
import type { StoreState } from '../../../types/index.js';

const mockStore: StoreState = mockState;

beforeEach(jest.clearAllMocks);

describe('subscription packages redux selectors', () => {
  describe('getSubscriptionPackagesError()', () => {
    it('Should get the subscription packages error property', () => {
      expect(
        selectors.getSubscriptionPackagesError(
          mockStore,
          mockSubscriptionPackageHash,
        ),
      ).toBeNull();
    });
  });

  describe('getSubscriptionPackages()', () => {
    it('Should get the subscription packages result property', () => {
      const expectedResult = [
        mockState.entities.subscriptionPackages['Newsletter'],
      ];

      expect(
        selectors.getSubscriptionPackages(
          mockStore,
          mockSubscriptionPackageHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('areUserSubscriptionsLoading()', () => {
    it('Should get the user subscriptions isLoading property', () => {
      const expectedResult = mockState.subscriptions.user.isLoading;

      expect(selectors.areUserSubscriptionsLoading(mockStore)).toBe(
        expectedResult,
      );
    });
  });

  describe('areSubscriptionPackagesLoading()', () => {
    it('Should get the subscription packages isLoading property', () => {
      const expectedResult =
        mockState.subscriptions.packages[mockSubscriptionPackageHash].isLoading;

      expect(
        selectors.areSubscriptionPackagesLoading(
          mockStore,
          mockSubscriptionPackageHash,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('getSubscriptionPackagesSupportedChannels()', () => {
    it('Should return the subscription packages supported delivery channels', () => {
      expect(
        selectors.getSubscriptionPackagesSupportedChannels(
          mockStore,
          mockSubscriptionPackageHash,
        ),
      ).toBe(
        mockState.subscriptions.packages[mockSubscriptionPackageHash].result
          .supportedChannels,
      );
    });
  });
});
