import React, { FC } from 'react';

import { Box, Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ContactsType, ProfileType } from '../../../../types/ProfileType';

type ProfileInfoType = {
  profile: ProfileType;
  onEditMode: () => void;
  userId: string | undefined;
};

const TitleContainer = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: '400',
  width: '110px',
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.body1,
    width: '140px',
    fontWeight: '500',
  },
}));
const ValueContainer = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
  wordWrap: 'break-word',
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.body1,
    fontWeight: '400',
  },
}));
const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  wordWrap: 'break-word',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
  },
}));

type ContactType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: FC<ContactType> = ({ contactTitle, contactValue }) => (
  <ContactContainer>
    <TitleContainer>{contactTitle}:</TitleContainer>
    <ValueContainer>{contactValue}</ValueContainer>
  </ContactContainer>
);

export const ProfileInfo: FC<ProfileInfoType> = ({ profile, onEditMode, userId }) => (
  <>
    {profile.lookingForAJob && (
      <ContactContainer>
        <TitleContainer>Looking for a job:</TitleContainer>
        <ValueContainer>{profile.lookingForAJobDescription}</ValueContainer>
      </ContactContainer>
    )}

    <ContactContainer>
      <TitleContainer>About me:</TitleContainer>
      <ValueContainer>{profile.aboutMe}</ValueContainer>
    </ContactContainer>
    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
    <Typography component="div" variant="h6" sx={{ fontWeight: '400' }}>
      Contacts
    </Typography>
    {Object.keys(profile.contacts).map(key => (
      <Contact
        key={key}
        contactTitle={key}
        contactValue={profile.contacts[key as keyof ContactsType]}
      />
    ))}
    <div>
      {!userId && (
        <Button variant="contained" onClick={onEditMode} sx={{ width: '80px' }}>
          EDIT
        </Button>
      )}
    </div>
  </>
);
