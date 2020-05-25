/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Box } from '@chakra-ui/core';
import TasklistNav from './tasklistNav';

const Tasklist = () => {
  return (
    <Box d="flex" justifyContent="center" flexDirection="column">
      <TasklistNav />
      <h1>Tasklist</h1>
    </Box>
  );
};

export default Tasklist;
