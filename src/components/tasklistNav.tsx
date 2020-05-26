import React from 'react';
import { Box, IconButton, Text } from '@chakra-ui/core';

const TasklistNav = () => {

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Box w="100%" display="flex" alignItems="center" justifyContent="space-between" height="90px">
      <Text fontSize="3xl">Posts</Text>
      <IconButton cursor="pointer" variantColor="blue" aria-label="Search database" icon="add" />
    </Box>
  );
};

export default TasklistNav;
