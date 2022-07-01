import type {
  GetContentError,
  GetContents,
  IsContentLoading,
} from '@farfetch/blackout-redux';

export type UseWidget = {
  widget: GetContents;
  isWidgetLoading: IsContentLoading;
  widgetError: GetContentError;
  fetchWidget: () => void;
};
