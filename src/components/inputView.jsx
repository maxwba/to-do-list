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
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';

const InputView = () => {
  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Is required';
    }
    return error;
  };

  return (
    <Box width="60%" display="flex" flexDirection="column" alignContent="center" justifyContent="center" marginBottom="30vh">
      <Formik
        initialValues={{ priority: '', title: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
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
                  <Select size="lg" icon="arrow-up-down" iconSize={3} {...field} id="priority" placeholder="Choose one">
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
                    width="97%"
                    size="lg"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    type="name"
                    id="title"
                    placeholder="Task title"
                  />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="message">
              {({ field, form }) => (
                <FormControl marginTop="10px" isInvalid={form.errors.message && form.touched.message}>
                  <FormLabel htmlFor="name">
                    <Text>Message</Text>
                  </FormLabel>
                  <Textarea
                    width="97%"
                    size="lg"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    type="name"
                    id="message"
                    placeholder="Task message"
                  />
                </FormControl>
              )}
            </Field>
            <Button
              cursor="pointer"
              mt={10}
              variantColor="blue"
              isLoading={props.isSubmitting}
              type="submit"
              float="right"
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default InputView;
