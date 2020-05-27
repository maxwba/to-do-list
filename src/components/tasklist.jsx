import React from 'react';
import { Box, Text, Heading, PseudoBox } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

import TasklistNav from './tasklistNav';

const Tasklist = () => {
  const state = useSelector((currentState) => currentState);
  const priorityBackground = (priority) => {
    let background = '';
    if (priority === 'high') {
      background = '#e40e3d';
    } else if (priority === 'medium') {
      background = 'orange';
    } else {
      background = '#4caf50';
    }
    return background;
  };

  return (
    <Box d="flex" flexDirection="column" height="100vh" position="relative">
      <TasklistNav />
      <Box overflowY="auto" position="absolute" top="90px" left="0px" right="0px" bottom="0px">
        <Box>
          {state.posts.map((post) => (
            <PseudoBox
              key={post.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              flex="1"
              rounded="md"
              margin="20px"
              border="1px solid #f1f3f7"
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.300' }}
              _focus={{ boxShadow: 'outline' }}
              cursor="pointer"
              transition="300ms all ease"
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #f1f3f7">
                <Box display="flex" alignItems="center">
                  <Box background={priorityBackground(post.priority)} marginRight="15px" width="25px" height="25px" borderRadius="50%" />
                  <Heading fontSize="xl">{post.title}</Heading>
                </Box>
                <Text>{post.date}</Text>
              </Box>
              <Text mt={4}>{post.message}</Text>
            </PseudoBox>
            // <Box key={post.id} cursor="pointer" shadow="md" borderWidth="1px" flex="1" rounded="md">
            //   <Box key={post.id} h="30px" d="flex" justifyContent="space-between" padding="5px" alignItems="center">
            //     <Box height="75%" w="5%" background={priorityBackground(post.priority)} />
            //     <Text fontWeight="700" fontSize="20px">{post.title}</Text>
            //     <Text fontWeight="300" fontSize="15px">{post.date}</Text>
            //   </Box>
            //   <Box border="solid 1px gray" borderBottomRightRadius="5px" borderBottomLeftRadius="5px" padding="5px" marginBottom="15px"><Text>{post.message}</Text></Box>
            // </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Tasklist;
