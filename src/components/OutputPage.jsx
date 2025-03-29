import styled from '@emotion/styled';
import DynamicButton from './DynamicButton';
import { useWorkflow } from '../hooks/useWorkflow';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #218838;
  }
`;

const OutputPage = ({ onNavigate }) => {
  const { config, executeWorkflow } = useWorkflow();

  return (
    <Container>
      <Header>
        <Title>Output Page</Title>
        <NavButton onClick={() => onNavigate('config')}>
          Edit Configuration
        </NavButton>
      </Header>

      <DynamicButton
        config={config}
        executeWorkflow={executeWorkflow}
      />
    </Container>
  );
};

export default OutputPage; 