import Boolean from './boolean/Boolean.js';
import CallToAction from './callToAction/CallToAction.js';
import Color from './color/Color.js';
import ComponentsList from './componentsList/ComponentsList.js';
import ContentList from './contentList/ContentList.js';
import DateTime from './dateTime/DateTime.js';
import Html from './html/Html.js';
import LongText from './longText/LongText.js';
import Media from './media/Media.js';
import Number from './number/Number.js';
import Text from './text/Text.js';
import type { DefaultMedia } from '../../types/index.js';

export const DEFAULT_MEDIA: DefaultMedia = {
  Xs: '480px',
  Sm: '768px',
  Md: '1024px',
  Lg: '1280px',
};

const baseComponents = {
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

export default baseComponents;
