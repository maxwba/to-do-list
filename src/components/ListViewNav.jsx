import React from 'react';
import { Box, IconButton, Text } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { setCurrentPost } from '../store/index';


const TasklistNav = () => {
  const dispatch = useDispatch();

  return (
    <Box background="#f1f3f7" padding="0 20px" display="flex" alignItems="center" justifyContent="space-between" height="90px">
      <Text fontSize="3xl">Posts</Text>
      <IconButton onClick={() => dispatch(setCurrentPost())} data-testid="render-post-view" border="aliceblue" cursor="pointer" variantColor="blue" aria-label="Search database" icon="add" />
    </Box>
  );
};

export default TasklistNav;
