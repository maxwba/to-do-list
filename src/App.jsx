import React from 'react';
import { Box, ThemeProvider } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import ListView from './components/ListView';
import DetailView from './components/DetailView';
import FormView from './components/FormView';

function App() {
  const state = useSelector((currentState) => currentState);

  return (
    <Box>
      <Box display="flex">
        <ThemeProvider>
          <Box boxShadow="2px -8px 8px -6px rgba(0,0,0,0.75)" w="80vh" h="100vh">
            <ListView />
          </Box>
          <Box w="100%" height="100vh" display="flex" justifyContent="center">
            {state.currentPost.id ? <DetailView /> : <FormView />}
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default App;
