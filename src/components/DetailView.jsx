/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Text,
  Input,
  Select,
  Textarea,
  Heading,
  Spinner,
} from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { editPost, deletePost } from '../store/index';

const InputView = () => {
  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Is required';
    }
    return error;
  };

  const state = useSelector((currentState) => currentState);
  const dispatch = useDispatch();

  return (
    <Box width="60%" display="flex" flexDirection="column" alignContent="center" justifyContent="center" marginBottom="20vh">
      {state.isLoadingPost ? (
        <Box d="flex" justifyContent="center" alignItems="center">
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
          <Box>
            <Heading>Edit Post</Heading>
            <Formik
              initialValues={{ ...state.currentPost, date: new Date().getTime() }}
              onSubmit={(values) => {
                dispatch(editPost(values));
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Field name="priority" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.priority && form.touched.priority}>
                        <FormLabel htmlFor="select">
                          <Text>Priority</Text>
                        </FormLabel>
                        <Select data-testid="priority-filled-field" size="lg" icon="arrow-up-down" iconSize={3} {...field} id="priority" placeholder="Choose one">
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </Select>
                        <FormErrorMessage>{form.errors.priority}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="title" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl marginTop="10px" isInvalid={form.errors.title && form.touched.title}>
                        <FormLabel htmlFor="name">
                          <Text>Title</Text>
                        </FormLabel>
                        <Input
                          data-testid="title-filled-field"
                          width="96%"
                          size="lg"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                          type="name"
                          id="title"
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="message" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl marginTop="10px" isInvalid={form.errors.message && form.touched.message}>
                        <FormLabel htmlFor="name">
                          <Text>Message</Text>
                        </FormLabel>
                        <Textarea
                          data-testid="message-filled-field"
                          width="96%"
                          size="lg"
                          fontSize="18px"
                          fontFamily="sans-serif"
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...field}
                          type="name"
                          id="message"
                        />
                        <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    border="aliceblue"
                    cursor="pointer"
                    mt={10}
                    variantColor="blue"
                    isLoading={state.isSavingPost}
                    type="submit"
                    float="right"
                  >
                    Save
                  </Button>
                  <Button
                    border="aliceblue"
                    cursor="pointer"
                    mt={10}
                    variantColor="pink"
                    isLoading={state.isSavingPost}
                    // type="submit"
                    onClick={() => dispatch(deletePost(state.currentPost.id))}
                    float="right"
                    marginRight="20px"
                  >
                    Delete
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        )}
    </Box>
  );
};

export default InputView;
