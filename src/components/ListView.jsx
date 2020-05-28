import React, { useEffect } from 'react';
import {
  Box, Text, Heading, PseudoBox, Spinner,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { onSetCurrentPost, fetchPosts } from '../store/index';

import ListViewNav from './ListViewNav';

const Tasklist = () => {
  const state = useSelector((currentState) => currentState);
  const dispatch = useDispatch();
  const priorityBackground = (priority) => {
    let background = '';
    if (priority === 'high') {
      background = '#e40e3d';
    } else if (priority === 'medium') {
      background = '#ffa500';
    } else {
      background = '#4caf50';
    }
    return background;
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Box d="flex" flexDirection="column" height="100vh" position="relative">
      <ListViewNav />
      <Box overflowY="auto" position="absolute" top="90px" left="0px" right="0px" bottom="0px">
        {state.isLoadingPosts
          ? (
            <Box d="flex" justifyContent="center" alignItems="center" h="100%">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          )
          : (
            <Box data-testid="post-list">
              {state.posts.map((post) => (
                <PseudoBox
                  data-testid="post-card"
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
                  onClick={() => dispatch(onSetCurrentPost(post))}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #f1f3f7">
                    <Box display="flex" alignItems="center">
                      <Box background={priorityBackground(post.priority)} marginRight="15px" minWidth="25px" minHeight="25px" borderRadius="50%" />
                      <Heading width="150px" fontSize="md" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{post.title}</Heading>
                    </Box>
                    <Text fontSize="sm" marginLeft="10px" textAlign="right" whiteSpace="nowrap">{new Date(post.date).toLocaleString()}</Text>
                  </Box>
                  <Text mt={4}>{post.message}</Text>
                </PseudoBox>
              ))}
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default Tasklist;
