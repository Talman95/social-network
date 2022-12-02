import React from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { loginValuesFormModel } from '../../api/auth/types';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginUser } from '../../store/middlewares/auth/actions';
import { selectCaptchaUrl } from '../../store/selectors/authSelectors';

export const Login = () => {
  const dispatch = useAppDispatch();

  const captchaUrl = useSelector(selectCaptchaUrl);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onFormSubmit = async (values: loginValuesFormModel) => {
    dispatch(loginUser(values));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
      captcha: '',
    },
    validationSchema,
    onSubmit: onFormSubmit,
  });

  if (formik.isSubmitting) {
    return <Preloader />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>

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
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}
                >
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
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
