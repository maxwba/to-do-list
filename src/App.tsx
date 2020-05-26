import React from 'react';
import { Box, ThemeProvider } from '@chakra-ui/core';
import Tasklist from './components/tasklist';
import InputView from './components/inputView';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Box display="flex">
      <ThemeProvider>
        <Box background="gray" w="80vh" h="100vh">
          <Tasklist />
        </Box>
        <Box w="100%" height="100vh" display="flex" justifyContent="center">
          <InputView />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
