import { ForterTokenReadyEvent } from './constants';
import get from 'lodash/get';

/**
 * Class that represents a detector for the forter token loaded event.
 *
 * @private
 */
export default class ForterTokenLoadedEventDetector {
  /**
   * Sets up the forter token loaded promise that will be resolved
   * when the forter token event is raised and starts listening
   * to the forter token loaded event.
   *
   * @memberof ForterTokenLoadedEventDetector#
   */
  constructor() {
    this.forterTokenLoadedEventPromise = new Promise(resolve => {
      this.forterTokenLoadedEventPromiseResolve = resolve;
    });

    this.setupForterTokenLoadedEventListener();
  }

  /**
   * Method that will be used to retrieve the forter token
   * after it is loaded.
   *
   * @async
   * @memberof ForterTokenLoadedEventDetector#
   *
   * @returns {Promise<string>} - Promise that will be resolved with the forter token when the event is raised by forter script.
   */
  async getForterToken() {
    const forterToken = await this.forterTokenLoadedEventPromise;

    return forterToken;
  }

  /**
   * Sets up the required event listeners in order to detect when the forter
   * token is loaded and resolve the promise returned by getForterToken.
   *
   * @memberof ForterTokenLoadedEventDetector#
   */
  setupForterTokenLoadedEventListener() {
    const callback = forterToken => {
      this.forterTokenLoadedEventPromiseResolve(forterToken);
    };

    // The Forter event will be fired through jQuery.trigger() if the jQuery is available, otherwise will use vanilla js.
    // Given the event name has the ':' character that is creating an event namespace, document.addEventListener()
    // will not be able to listen to this event (due to being launched through jQuery.trigger()).
    // So, to avoid lost events, we do the same validation for the event handling, using jQuery if available.
    if (typeof window['jQuery'] === 'function') {
      window['jQuery'](document).on(
        ForterTokenReadyEvent,
        function (_event, forterToken) {
          callback(forterToken);
        },
      );
    } else {
      document.addEventListener(ForterTokenReadyEvent, function (event) {
        const eventDetail = get(event, 'detail', {});

        callback(eventDetail);
      });
    }
  }
}
