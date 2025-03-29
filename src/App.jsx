import { useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import ConfigPage from './components/ConfigPage'
import OutputPage from './components/OutputPage'
import './App.css'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background-color);
  animation: ${fadeIn} 0.5s ease;
`

const PageContainer = styled.div`
  animation: ${fadeIn} 0.3s ease;
`

const App = () => {
  const [currentPage, setCurrentPage] = useState('config')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <AppContainer>
      <PageContainer>
        {currentPage === 'config' ? (
          <ConfigPage onNavigate={handleNavigate} />
        ) : (
          <OutputPage onNavigate={handleNavigate} />
        )}
      </PageContainer>
    </AppContainer>
  )
}

export default App
