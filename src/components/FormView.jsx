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
import { createPost } from '../store/index';

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
      <Heading>New Post</Heading>
      {state.isSavingPost
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
          <Formik
            initialValues={{
              priority: '', title: state.currentPost.title || '', message: '', date: new Date().getTime(),
            }}
            onSubmit={(values) => {
              dispatch(createPost(values));
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
                      <Select data-testid="priority-field" size="lg" icon="arrow-up-down" {...field} id="priority" placeholder="Choose one">
                        <option data-testid="priority-high" key="high" value="high">High</option>
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
                        data-testid="title-field"
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
                        data-testid="message-field"
                        width="96%"
                        fontSize="18px"
                        fontFamily="sans-serif"
                        size="lg"
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
                  Create
                </Button>
              </form>
            )}
          </Formik>
        )}

    </Box>
  );
};

export default InputView;
