import { useState } from 'react';
import styled from '@emotion/styled';
import { ACTION_TYPES, ACTION_CONFIGS } from '../actions/actionTypes';
import ActionList from './ActionList';
import { useWorkflow } from '../hooks/useWorkflow';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
`;

const Title = styled.h1`
  margin: 0;
  color: var(--text-primary);
  font-size: 2rem;
`;

const ButtonLabelSection = styled.div`
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const ButtonLabelInput = styled.input`
  padding: 0.75rem;
  font-size: 1.2rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  width: 100%;
  max-width: 400px;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const ActionSelector = styled.div`
  background: var(--card-background);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  flex: 1;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--card-background);
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NavButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--secondary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: var(--card-background);
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  color: var(--text-secondary);
`;

const ConfigPage = ({ onNavigate }) => {
  const {
    config,
    updateButtonLabel,
    addAction,
    removeAction,
    updateAction,
    reorderActions,
  } = useWorkflow();

  const [selectedAction, setSelectedAction] = useState('');

  const handleAddAction = () => {
    if (selectedAction) {
      addAction(selectedAction, ACTION_CONFIGS[selectedAction].config);
      setSelectedAction('');
    }
  };

  return (
    <Container>
      <Header>
        <Title>Configure Button Workflow</Title>
        <NavButton onClick={() => onNavigate('output')}>
          View Output Page
        </NavButton>
      </Header>

      <ButtonLabelSection>
        <Label>Button Label</Label>
        <ButtonLabelInput
          type="text"
          value={config.buttonLabel}
          onChange={(e) => updateButtonLabel(e.target.value)}
          placeholder="Enter button label..."
        />
      </ButtonLabelSection>

      <ActionSelector>
        <Label>Add New Action</Label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="">Select an action...</option>
            {Object.entries(ACTION_CONFIGS).map(([type, { label }]) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </Select>
          <AddButton onClick={handleAddAction}>
            Add Action
          </AddButton>
        </div>
      </ActionSelector>

      {config.actions.length === 0 ? (
        <EmptyState>
          <h3>No Actions Added Yet</h3>
          <p>Select an action from above and click "Add Action" to get started.</p>
        </EmptyState>
      ) : (
        <ActionList
          actions={config.actions}
          onUpdate={updateAction}
          onRemove={removeAction}
          onReorder={reorderActions}
        />
      )}
    </Container>
  );
};

export default ConfigPage; 