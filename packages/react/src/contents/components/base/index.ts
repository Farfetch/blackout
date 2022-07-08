import Boolean from './boolean/Boolean';
import CallToAction from './callToAction/CallToAction';
import Color from './color/Color';
import ComponentsList from './componentsList/ComponentsList';
import ContentList from './contentList/ContentList';
import DateTime from './dateTime/DateTime';
import Html from './html/Html';
import LongText from './longText/LongText';
import Media from './media/Media';
import Number from './number/Number';
import Text from './text/Text';
import type { DefaultMedia } from '../../types';

export const DEFAULT_MEDIA: DefaultMedia = {
  Xs: '480px',
  Sm: '768px',
  Md: '1024px',
  Lg: '1280px',
};

export default {
  bool: Boolean,
  color: Color,
  ContentListComponent: ContentList,
  date: DateTime,
  html: Html,
  link: CallToAction,
  list: ComponentsList,
  longtext: LongText,
  MediaComponent: Media,
  number: Number,
  text: Text,
};
