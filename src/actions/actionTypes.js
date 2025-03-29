export const ACTION_TYPES = {
  ALERT: 'alert',
  SHOW_TEXT: 'showText',
  SHOW_IMAGE: 'showImage',
  REFRESH_PAGE: 'refreshPage',
  SET_LOCAL_STORAGE: 'setLocalStorage',
  GET_LOCAL_STORAGE: 'getLocalStorage',
  INCREASE_BUTTON_SIZE: 'increaseButtonSize',
  CLOSE_WINDOW: 'closeWindow',
  PROMPT_AND_SHOW: 'promptAndShow',
  CHANGE_BUTTON_COLOR: 'changeButtonColor',
  DISABLE_BUTTON: 'disableButton',
};

export const ACTION_CONFIGS = {
  [ACTION_TYPES.ALERT]: {
    label: 'Alert',
    config: {
      message: '',
    },
  },
  [ACTION_TYPES.SHOW_TEXT]: {
    label: 'Show Text',
    config: {
      text: '',
    },
  },
  [ACTION_TYPES.SHOW_IMAGE]: {
    label: 'Show Image',
    config: {
      url: '',
    },
  },
  [ACTION_TYPES.REFRESH_PAGE]: {
    label: 'Refresh Page',
    config: {},
  },
  [ACTION_TYPES.SET_LOCAL_STORAGE]: {
    label: 'Set LocalStorage',
    config: {
      key: '',
      value: '',
    },
  },
  [ACTION_TYPES.GET_LOCAL_STORAGE]: {
    label: 'Get LocalStorage',
    config: {
      key: '',
    },
  },
  [ACTION_TYPES.INCREASE_BUTTON_SIZE]: {
    label: 'Increase Button Size',
    config: {
      increment: 10,
    },
  },
  [ACTION_TYPES.CLOSE_WINDOW]: {
    label: 'Close Window',
    config: {},
  },
  [ACTION_TYPES.PROMPT_AND_SHOW]: {
    label: 'Prompt and Show',
    config: {
      prompt: '',
      prefix: '',
    },
  },
  [ACTION_TYPES.CHANGE_BUTTON_COLOR]: {
    label: 'Change Button Color',
    config: {
      color: '#000000',
      random: false,
    },
  },
  [ACTION_TYPES.DISABLE_BUTTON]: {
    label: 'Disable Button',
    config: {},
  },
}; 