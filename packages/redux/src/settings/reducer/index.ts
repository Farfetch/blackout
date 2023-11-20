/* eslint-disable prettier/prettier */

import { default as accountSettingReducer } from './accountSetting.js'
import { default as accountSettingsReducer } from './accountSettings.js'
import { combineReducers } from 'redux';
import { default as configurationsReducer, entitiesMapper as settingsEntitiesMapper } from './configurations.js'

export {
  settingsEntitiesMapper,
  configurationsReducer,
  accountSettingsReducer,
  accountSettingReducer,
};

const settingsReducer = combineReducers({
  configurations: configurationsReducer,
  accountSetting: accountSettingReducer,
  accountSettings: accountSettingsReducer,
})

export default settingsReducer;