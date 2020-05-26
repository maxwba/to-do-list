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
  FormHelperText,
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';

const InputView = () => {
  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  };

  return (
    <Box width="50%" display="flex" flexDirection="column" alignContent="center" justifyContent="center">
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">
                    <Text>Priority</Text>
                  </FormLabel>
                  <Select icon="arrow-up-down" {...field} id="name" placeholder="Choose one" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              cursor="pointer"
              mt={4}
              variantColor="blue"
              isLoading={props.isSubmitting}
              type="submit"
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
