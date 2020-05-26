import React, { useEffect } from 'react';
import { Box, ThemeProvider } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Tasklist from './components/tasklist';
import InputView from './components/inputView';
import { fetchPosts } from './store/index';

function App() {
  const state = useSelector((currentState) => currentState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Box>
      {state.isLoadingPosts ? <h1>Loading...</h1> : (
        <Box display="flex">
          <ThemeProvider>
            <Box boxShadow="2px -8px 8px -6px rgba(0,0,0,0.75)" w="80vh" h="100vh">
              <Tasklist />
            </Box>
            <Box w="100%" height="100vh" display="flex" justifyContent="center">
              <InputView />
            </Box>
          </ThemeProvider>
        </Box>
      )}
    </Box>
    // eslint-disable-next-line react/jsx-filename-extension

  );
}

export default App;
