import { useState } from 'react';
import styled from '@emotion/styled';
import { ACTION_CONFIGS } from '../actions/actionTypes';

const ActionContainer = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-1px);
  }
`;

const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
`;

const ActionTitle = styled.h3`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: var(--danger-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--danger-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ConfigFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--card-background);
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.875rem;

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--border-color);
    cursor: pointer;
  }
`;

const ColorInput = styled.input`
  width: 100px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
  }
`;

const ActionItem = ({ action, onUpdate, onRemove }) => {
  const [config, setConfig] = useState(action.config);
  const actionConfig = ACTION_CONFIGS[action.type];

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onUpdate(action.id, newConfig);
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this action?')) {
      onRemove(action.id);
    }
  };

  const renderConfigFields = () => {
    switch (action.type) {
      case 'alert':
        return (
          <InputGroup>
            <InputLabel>Alert Message</InputLabel>
            <Input
              type="text"
              value={config.message}
              onChange={(e) => handleConfigChange('message', e.target.value)}
              placeholder="Enter alert message..."
            />
          </InputGroup>
        );
      case 'showText':
        return (
          <InputGroup>
            <InputLabel>Text to Display</InputLabel>
            <Input
              type="text"
              value={config.text}
              onChange={(e) => handleConfigChange('text', e.target.value)}
              placeholder="Enter text to display..."
            />
          </InputGroup>
        );
      case 'showImage':
        return (
          <InputGroup>
            <InputLabel>Image URL</InputLabel>
            <Input
              type="url"
              value={config.url}
              onChange={(e) => handleConfigChange('url', e.target.value)}
              placeholder="Enter image URL..."
            />
          </InputGroup>
        );
      case 'setLocalStorage':
        return (
          <>
            <InputGroup>
              <InputLabel>Storage Key</InputLabel>
              <Input
                type="text"
                value={config.key}
                onChange={(e) => handleConfigChange('key', e.target.value)}
                placeholder="Enter storage key..."
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>Storage Value</InputLabel>
              <Input
                type="text"
                value={config.value}
                onChange={(e) => handleConfigChange('value', e.target.value)}
                placeholder="Enter storage value..."
              />
            </InputGroup>
          </>
        );
      case 'getLocalStorage':
        return (
          <InputGroup>
            <InputLabel>Storage Key</InputLabel>
            <Input
              type="text"
              value={config.key}
              onChange={(e) => handleConfigChange('key', e.target.value)}
              placeholder="Enter storage key to retrieve..."
            />
          </InputGroup>
        );
      case 'increaseButtonSize':
        return (
          <InputGroup>
            <InputLabel>Size Increment (px)</InputLabel>
            <Input
              type="number"
              value={config.increment}
              onChange={(e) => handleConfigChange('increment', parseInt(e.target.value))}
              placeholder="Enter size increment..."
            />
          </InputGroup>
        );
      case 'promptAndShow':
        return (
          <>
            <InputGroup>
              <InputLabel>Prompt Message (e.g., "Enter your name")</InputLabel>
              <Input
                type="text"
                value={config.prompt}
                onChange={(e) => handleConfigChange('prompt', e.target.value)}
                placeholder="Enter prompt message..."
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>Text Prefix</InputLabel>
              <Input
                type="text"
                value={config.prefix}
                onChange={(e) => handleConfigChange('prefix', e.target.value)}
                placeholder="Enter display format..."
              />
            </InputGroup>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary)', 
              marginTop: '0.5rem',
              padding: '0.75rem',
              background: 'var(--background-color)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)'
            }}>
              Output will be displayed as: Hello, "{config.prompt}"  "{config.prefix}[user input]"
            </div>
          </>
        );
      case 'changeButtonColor':
        return (
          <>
            <Checkbox>
              <input
                type="checkbox"
                checked={config.random}
                onChange={(e) => handleConfigChange('random', e.target.checked)}
              />
              Use Random Color
            </Checkbox>
            {!config.random && (
              <InputGroup>
                <InputLabel>Button Color</InputLabel>
                <ColorInput
                  type="color"
                  value={config.color}
                  onChange={(e) => handleConfigChange('color', e.target.value)}
                />
              </InputGroup>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ActionContainer>
      <ActionHeader>
        <ActionTitle>
          {actionConfig.label}
        </ActionTitle>
        <RemoveButton onClick={handleRemove}>
          Remove Action
        </RemoveButton>
      </ActionHeader>
      <ConfigFields>
        {renderConfigFields()}
      </ConfigFields>
    </ActionContainer>
  );
};

export default ActionItem; 