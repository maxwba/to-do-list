/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Box } from '@chakra-ui/core';
import TasklistNav from './tasklistNav';

const Tasklist = () => (
  <Box d="flex" flexDirection="column" height="100vh" position="relative">
    <TasklistNav />
    <Box overflowY="auto" position="absolute" top="90px" left="0px" right="0px" bottom="0px">
      <ul>
        <li />
      </ul>
    </Box>
  </Box>
);

export default Tasklist;
