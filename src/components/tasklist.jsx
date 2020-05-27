/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import TasklistNav from './tasklistNav';

const Tasklist = () => {
  const state = useSelector((currentState) => currentState);

  return (
    <Box marginLeft="20px" d="flex" flexDirection="column" height="100vh" position="relative">
      <TasklistNav />
      <Box overflowY="auto" position="absolute" top="90px" left="0px" right="0px" bottom="0px">
        <Box>
          {state.posts.map((post) => (
            <Box>
              <Box key={post.id} border="solid 1px gray" h="30px" d="flex" justifyContent="space-between" padding="5px" alignItems="center">
                <Text fontWeight="700" fontSize="20px">{post.title}</Text>
                <Text fontWeight="300" fontSize="15px">{post.date}</Text>
              </Box>
              <Box border="solid 1px gray" borderBottomRightRadius="5px" borderBottomLeftRadius="5px" padding="5px" marginBottom="15px"><Text>{post.message}</Text></Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Tasklist;
