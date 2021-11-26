import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * @callback UnsubscribeRecipientFromTopicThunkFactory
 *
 * @alias UnsubscribeRecipientFromTopicThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param   {string} subscriptionId - Id of the subscription to be affected.
 * @param   {string} topicId - Id of topic to remove the recipient from.
 * @param   {string} recipientId - The id of the recipient to be removed.
 * @param   {object} [meta] - Meta parameters for the action.
 * @param   {boolean} [meta.trackRequestState] - Flag to indicate if the request state should be tracked on the redux store.
 * @param   {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function unsubscribeRecipientFromTopicFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param {Function} deleteRecipientFromTopic - Delete recipient from subscription topic client.
 *
 * @returns {UnsubscribeRecipientFromTopicThunkFactory} Thunk factory.
 */
export default deleteRecipientFromTopic =>
  (subscriptionId, topicId, recipientId, meta, config) =>
  async dispatch => {
    dispatch({
      type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
      payload: {
        subscriptionId,
        topicId,
        recipientId,
      },
      meta,
    });

    try {
      await deleteRecipientFromTopic(
        subscriptionId,
        topicId,
        recipientId,
        config,
      );

      dispatch({
        payload: {
          recipientId,
        },
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { recipientId, error },
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
      });

      throw error;
    }
  };
