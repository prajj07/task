import { useState, useEffect } from 'react';
import { ACTION_TYPES } from '../actions/actionTypes';

const STORAGE_KEY = 'button-workflow-config';

export const useWorkflow = () => {
  const [config, setConfig] = useState({
    buttonLabel: 'Click Me!',
    actions: [],
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const updateButtonLabel = (label) => {
    saveConfig({ ...config, buttonLabel: label });
  };

  const addAction = (actionType, actionConfig) => {
    const newAction = {
      id: Date.now(),
      type: actionType,
      config: actionConfig,
    };
    saveConfig({
      ...config,
      actions: [...config.actions, newAction],
    });
  };

  const removeAction = (actionId) => {
    saveConfig({
      ...config,
      actions: config.actions.filter((action) => action.id !== actionId),
    });
  };

  const updateAction = (actionId, newConfig) => {
    saveConfig({
      ...config,
      actions: config.actions.map((action) =>
        action.id === actionId ? { ...action, config: newConfig } : action
      ),
    });
  };

  const reorderActions = (startIndex, endIndex) => {
    const result = Array.from(config.actions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveConfig({ ...config, actions: result });
  };

  const executeWorkflow = async (setButtonState, onActionChange) => {
    for (let i = 0; i < config.actions.length; i++) {
      const action = config.actions[i];
      onActionChange?.(i);

      switch (action.type) {
        case ACTION_TYPES.ALERT:
          alert(action.config.message);
          break;
        case ACTION_TYPES.SHOW_TEXT:
          setButtonState((prev) => ({
            ...prev,
            displayedText: action.config.text,
          }));
          break;
        case ACTION_TYPES.SHOW_IMAGE:
          setButtonState((prev) => ({
            ...prev,
            displayedImage: action.config.url,
          }));
          break;
        case ACTION_TYPES.REFRESH_PAGE:
          window.location.reload();
          break;
        case ACTION_TYPES.SET_LOCAL_STORAGE:
          localStorage.setItem(action.config.key, action.config.value);
          break;
        case ACTION_TYPES.GET_LOCAL_STORAGE:
          const value = localStorage.getItem(action.config.key);
          setButtonState((prev) => ({
            ...prev,
            displayedText: value || 'No value found',
          }));
          break;
        case ACTION_TYPES.INCREASE_BUTTON_SIZE:
          setButtonState((prev) => ({
            ...prev,
            buttonSize: prev.buttonSize + action.config.increment,
          }));
          break;
        case ACTION_TYPES.CLOSE_WINDOW:
          window.close();
          break;
        case ACTION_TYPES.PROMPT_AND_SHOW:
          const input = prompt(action.config.prompt);
          if (input) {
            setButtonState((prev) => ({
              ...prev,
              displayedText: `${action.config.prefix}${input}`,
            }));
          }
          break;
        case ACTION_TYPES.CHANGE_BUTTON_COLOR:
          const color = action.config.random
            ? `#${Math.floor(Math.random()*16777215).toString(16)}`
            : action.config.color;
          setButtonState((prev) => ({
            ...prev,
            buttonColor: color,
          }));
          break;
        case ACTION_TYPES.DISABLE_BUTTON:
          setButtonState((prev) => ({
            ...prev,
            disabled: true,
          }));
          break;
        default:
          console.warn('Unknown action type:', action.type);
      }
      // Add a small delay between actions for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  return {
    config,
    updateButtonLabel,
    addAction,
    removeAction,
    updateAction,
    reorderActions,
    executeWorkflow,
  };
}; 