import Boolean from './boolean/Boolean.jsx';
import CallToAction from './callToAction/CallToAction.jsx';
import Color from './color/Color.jsx';
import ComponentList from './componentList/ComponentList.jsx';
import ContentList from './contentList/ContentList.jsx';
import DateTime from './dateTime/DateTime.jsx';
import Html from './html/Html.jsx';
import LongText from './longText/LongText.jsx';
import Media from './media/Media.jsx';
import Number from './number/Number.jsx';
import Text from './text/Text.jsx';
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
  list: ComponentList,
  longtext: LongText,
  MediaComponent: Media,
  number: Number,
  text: Text,
};

export default baseComponents;
