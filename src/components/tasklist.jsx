/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Box } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import TasklistNav from './tasklistNav';

const Tasklist = () => {
  const state = useSelector((currentState) => currentState);

  return (
    <Box marginLeft="20px" d="flex" flexDirection="column" height="100vh" position="relative">
      <TasklistNav />
      <Box overflowY="auto" position="absolute" top="90px" left="0px" right="0px" bottom="0px">
        <ul>
          {state.posts.map((post) => <li key={post.id}>{post.title}</li>)}
        </ul>
      </Box>
    </Box>
  );
};

export default Tasklist;
