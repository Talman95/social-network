import React, { FC } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { updateProfile } from '../../../../store/middlewares/profile/thunks';
import { UpdateProfileModal } from '../../../../store/reducers/profileReducer';
import { ContactsType, ProfileType } from '../../../../types/ProfileType';

import { Contact } from './Contact/Contact';
import { ContactContainer, TitleContainer, ValueContainer } from './Contact/styles';

type PropsType = {
  profile: ProfileType;
  offEditMode: () => void;
};

export const ProfileDataForm: FC<PropsType> = ({ profile, offEditMode }) => {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required'),
  });

  const submit = (values: UpdateProfileModal): void => {
    dispatch(updateProfile(values));
    offEditMode();
  };

  const formik = useFormik({
    initialValues: {
      aboutMe: profile?.aboutMe,
      contacts: {
        facebook: profile?.contacts.facebook,
        website: profile?.contacts.website,
        vk: profile?.contacts.vk,
        twitter: profile?.contacts.twitter,
        instagram: profile?.contacts.instagram,
        youtube: profile?.contacts.youtube,
        github: profile?.contacts.github,
        mainLink: profile?.contacts.mainLink,
      },
      lookingForAJob: profile?.lookingForAJob,
      lookingForAJobDescription: profile?.lookingForAJobDescription,
      fullName: profile?.fullName,
    },
    validationSchema,
    onSubmit: submit,
  });

  return (
    <FormControl>
      <form onSubmit={formik.handleSubmit}>
        <ContactContainer>
          <TitleContainer>Name:</TitleContainer>
          <ValueContainer>
            <TextField
              id="full-name"
              variant="standard"
              fullWidth
              {...formik.getFieldProps('fullName')}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </ValueContainer>
        </ContactContainer>

        <Box sx={{ alignSelf: 'flex-start' }}>
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
        </Box>

        <Contact
          id="looking-for-description"
          title="Description"
          value={formik.values.lookingForAJobDescription}
          onChange={formik.handleChange}
        />

        <Contact
          id="aboutMe"
          title="About me"
          value={formik.values.aboutMe}
          onChange={formik.handleChange}
        />

        <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

        <Typography component="div" variant="h6" sx={{ fontWeight: '400' }}>
          Contacts
        </Typography>

        {Object.keys(profile.contacts).map(key => {
          const id = `contacts.${key}`;

          return (
            <Contact
              key={key}
              id={id}
              title={key}
              onChange={formik.handleChange}
              value={formik.values.contacts[key as keyof ContactsType]}
            />
          );
        })}

        <Box sx={{ alignSelf: 'flex-start', marginTop: '15px' }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: '80px', marginRight: '15px' }}
          >
            SAVE
          </Button>
          <Button variant="contained" onClick={offEditMode} sx={{ width: '80px' }}>
            CANCEL
          </Button>
        </Box>
      </form>
    </FormControl>
  );
};
