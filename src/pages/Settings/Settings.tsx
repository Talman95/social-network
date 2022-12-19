import React, { FC } from 'react';

import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { contacts } from '../../constants/contacts';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateProfile } from '../../store/middlewares/profile';
import { UpdateProfileModel } from '../../store/reducers/profileReducer';
import { selectAuthUser } from '../../store/selectors/authSelectors';
import { ContactsType } from '../../types/ProfileType';

import { Contact } from './Contact/Contact';

const Settings: FC = () => {
  const dispatch = useAppDispatch();

  const profile = useSelector(selectAuthUser);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required'),
  });

  const onFormSubmit = (values: UpdateProfileModel): void => {
    dispatch(updateProfile(values));
  };

  const formik = useFormik({
    initialValues: {
      aboutMe: profile?.aboutMe || '',
      contacts: {
        facebook: profile?.contacts.facebook || '',
        website: profile?.contacts.website || '',
        vk: profile?.contacts.vk || '',
        twitter: profile?.contacts.twitter || '',
        instagram: profile?.contacts.instagram || '',
        youtube: profile?.contacts.youtube || '',
        github: profile?.contacts.github || '',
        mainLink: profile?.contacts.mainLink || '',
      },
      lookingForAJob: profile?.lookingForAJob || false,
      lookingForAJobDescription: profile?.lookingForAJobDescription || '',
      fullName: profile?.fullName || '',
    },
    validationSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <Card>
      <Box p={4}>
        <FormControl>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Typography variant="h5">Main</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    {...formik.getFieldProps('fullName')}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                  />
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    About me
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    {...formik.getFieldProps('aboutMe')}
                  />
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Looking for a job?
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.lookingForAJob}
                        onChange={formik.handleChange}
                        name="lookingForAJob"
                      />
                    }
                    label="Looking for a job?"
                    name="lookingForAJob"
                    id="lookingForAJob"
                  />
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    rows={4}
                    {...formik.getFieldProps('lookingForAJobDescription')}
                  />
                </Grid>
              </Grid>

              <Typography variant="h5">Contacts</Typography>

              <Grid container spacing={2}>
                {contacts.map(({ title, formikName, value }) => (
                  <Contact
                    key={title}
                    title={title}
                    name={formikName}
                    onChange={formik.handleChange}
                    value={formik.values.contacts[value as keyof ContactsType]}
                  />
                ))}
              </Grid>

              <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </FormGroup>
          </form>
        </FormControl>
      </Box>
    </Card>
  );
};

export default Settings;
