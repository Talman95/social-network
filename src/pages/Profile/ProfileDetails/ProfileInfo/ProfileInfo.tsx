import React, { FC } from 'react';

import { Button, Divider, Typography } from '@mui/material';

import { ContactsType, ProfileType } from '../../../../types/ProfileType';

import { Contact } from './Contact/Contact';

type ProfileInfoType = {
  profile: ProfileType;
  onEditMode: () => void;
  userId: string | undefined;
};

export const ProfileInfo: FC<ProfileInfoType> = ({ profile, onEditMode, userId }) => (
  <>
    {profile.lookingForAJob && (
      <Contact title="Looking for a job" value={profile.lookingForAJobDescription} />
    )}

    <Contact title="About me" value={profile.aboutMe} />

    <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

    <Typography component="div" variant="h6" sx={{ fontWeight: '400' }}>
      Contacts
    </Typography>

    {Object.keys(profile.contacts).map(key => (
      <Contact
        key={key}
        title={key}
        value={profile.contacts[key as keyof ContactsType]}
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
