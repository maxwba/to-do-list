import React from 'react';
import { Box } from '@chakra-ui/core';
import Tasklist from './components/tasklist';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Box className="App">
      <Box border="solid" w="60vh" h="100%">
        <Tasklist />
      </Box>
    </Box>
  );
}

export default App;
