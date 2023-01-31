import { ForterTokenReadyEvent } from '../Forter/constants';
import ForterTokenLoadedEventDetector from '../Forter/ForterTokenLoadedEventDetector';

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
      eventHandlers: {},

      on(event, handler) {
        if (!this.eventHandlers[event]) {
          this.eventHandlers[event] = [];
        }

        this.eventHandlers[event].push(handler);
      },

      trigger(event, eventData) {
        if (!this.eventHandlers[event]) {
          return;
        }

        this.eventHandlers[event].forEach(handler => handler(event, eventData));
      },
    };

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
