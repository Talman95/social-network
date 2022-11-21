import React from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { login } from '../../store/middlewares/auth/sagas';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import { Preloader } from '../common/Preloader/Preloader';

export type formValuesModel = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const Login = (): ReturnComponentType => {
  const captchaUrl = useAppSelector(state => state.auth.captchaUrl);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const submit = async (
    values: formValuesModel,
    { resetForm }: FormikHelpers<formValuesModel>,
  ) => {
    await dispatch(login(values));
    resetForm({});
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
      captcha: '',
    },
    validationSchema,
    onSubmit: submit,
  });

  if (formik.isSubmitting) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <FormControl>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                id="email"
                label="Email"
                type="email"
                margin="normal"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                margin="normal"
                {...formik.getFieldProps('password')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControlLabel
                label="Remember me?"
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              {captchaUrl && (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <img alt="captcha" src={captchaUrl} />
                  <TextField
                    id="captcha"
                    type="captcha"
                    margin="normal"
                    {...formik.getFieldProps('captcha')}
                  />
                </Box>
              )}
              <Button color="primary" variant="contained" type="submit">
                Sign In
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};
