import { ForterTokenReadyEvent } from '../constants';
import ForterTokenLoadedEventDetector from '../forterTokenLoadedEventDetector';

describe('ForterTokenLoadedEventDetector', () => {
  it('should return a forter token when the forter token loaded event is raised through element.dispatchEvent', async () => {
    const detector = new ForterTokenLoadedEventDetector();

    const mockForterToken =
      '44807307964b4931a89bf364e580bdc5_1594724271711__UDF43_9ck';

    const event = new CustomEvent(ForterTokenReadyEvent, {
      detail: mockForterToken,
    });

    document.dispatchEvent(event);

    const returnedForterToken = await detector.getForterToken();

    expect(returnedForterToken).toBe(mockForterToken);
  });

  it('should return a forter token when the forter token loaded event is raised through jQuery.trigger', async () => {
    const mockJqueryObject = {
      eventHandlers: {} as Record<
        string,
        Array<(event: string, data: unknown) => void>
      >,

      on(event: string, handler: (event: string, data: unknown) => void) {
        if (!this.eventHandlers[event]) {
          this.eventHandlers[event] = [];
        }

        this.eventHandlers[event]?.push(handler);
      },

      trigger(event: string, eventData: unknown) {
        if (!this.eventHandlers[event]) {
          return;
        }

        this.eventHandlers[event]?.forEach(handler =>
          handler(event, eventData),
        );
      },
    };

    // @ts-expect-error jQuery mock only contains necessary properties relevant for testing
    window.jQuery = () => {
      return mockJqueryObject;
    };

    const detector = new ForterTokenLoadedEventDetector();

    const mockForterToken =
      '44807307964b4931a89bf364e580bdc5_1594724271711__UDF43_9ck';

    window.jQuery(document).trigger(ForterTokenReadyEvent, mockForterToken);

    const returnedForterToken = await detector.getForterToken();

    expect(returnedForterToken).toBe(mockForterToken);
  });
});
