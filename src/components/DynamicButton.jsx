import { useState } from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--card-background);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: ${props => props.size}px;
  background-color: ${props => props.color};
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'var(--shadow-md)' : 'var(--shadow-lg)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const DisplayedText = styled.div`
  margin-top: 1rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background-color: var(--background-color);
  max-width: 100%;
  word-break: break-word;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  animation: fadeIn 0.3s ease;
`;

const DisplayedImage = styled.img`
  max-width: 100%;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-md);
  animation: fadeIn 0.3s ease;
`;

const WorkflowStatus = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--card-background);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: slideIn 0.3s ease;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--secondary-color)' : 'var(--text-secondary)'};
  transition: all 0.3s ease;
`;

const ActionCounter = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const DynamicButton = ({ config, executeWorkflow }) => {
  const [buttonState, setButtonState] = useState({
    buttonSize: 16,
    buttonColor: 'var(--primary-color)',
    disabled: false,
    displayedText: '',
    displayedImage: '',
  });
  const [workflowStatus, setWorkflowStatus] = useState({
    currentAction: 0,
    totalActions: config.actions.length,
    isRunning: false,
  });

  const handleClick = async () => {
    if (buttonState.disabled) return;
    
    setWorkflowStatus(prev => ({ ...prev, isRunning: true }));
    await executeWorkflow(setButtonState, (currentAction) => {
      setWorkflowStatus(prev => ({ ...prev, currentAction }));
    });
    setWorkflowStatus(prev => ({ ...prev, isRunning: false }));
  };

  return (
    <ButtonContainer>
      <StyledButton
        onClick={handleClick}
        size={buttonState.buttonSize}
        color={buttonState.buttonColor}
        disabled={buttonState.disabled}
      >
        {config.buttonLabel}
      </StyledButton>
      
      {buttonState.displayedText && (
        <DisplayedText>{buttonState.displayedText}</DisplayedText>
      )}
      
      {buttonState.displayedImage && (
        <DisplayedImage src={buttonState.displayedImage} alt="Displayed" />
      )}

      {workflowStatus.isRunning && (
        <WorkflowStatus>
          <StatusDot active={true} />
          <ActionCounter>
            Action {workflowStatus.currentAction + 1} of {workflowStatus.totalActions}
          </ActionCounter>
        </WorkflowStatus>
      )}
    </ButtonContainer>
  );
};

export default DynamicButton; 