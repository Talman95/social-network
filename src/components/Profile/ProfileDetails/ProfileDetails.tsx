import React, { ChangeEvent, FC } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { useOutside } from '../../../hooks/useOutside';
import { ProfileType } from '../../../types/ProfileType';
import { Preloader } from '../../common/Preloader/Preloader';

import { ProfileDataForm } from './ProfileDataForm/ProfileDataForm';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';

const color = 500;

type ProfileDetailsPropsType = {
  profile: ProfileType | null;
  status: string;
  isFriend: boolean;
  userId: string | undefined;
  follow: () => void;
  unfollow: () => void;
  photoSelected: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = styled('input')({
  display: 'none',
});

export const ProfileDetails: FC<ProfileDetailsPropsType> = ({
  profile,
  status,
  isFriend,
  userId,
  follow,
  unfollow,
  photoSelected,
}) => {
  const { ref, isShow, setIsShow } = useOutside(false);

  const onEditMode = (): void => {
    setIsShow(true);
  };
  const offEditMode = (): void => {
    setIsShow(false);
  };

  if (!profile) {
    return <Preloader />;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        margin: 1,
        padding: { sm: 2 },
        flexDirection: { xs: 'column', sm: 'inherit' },
        alignItems: { xs: 'center', sm: 'inherit' },
      }}
      ref={ref}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Avatar
          alt={profile.fullName || 'user'}
          src={profile.photos.large || ''}
          sx={{ width: 151, height: 151, bgcolor: blue[color], margin: 1 }}
        />
        {userId && (
          <Stack spacing={2} direction="column">
            {isFriend ? (
              <Button
                variant="outlined"
                startIcon={<PersonRemoveIcon />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={unfollow}
              >
                UNFOLLOW
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={follow}
              >
                FOLLOW
              </Button>
            )}
            <Button variant="contained">Message</Button>
          </Stack>
        )}
        {!userId && (
          <Stack spacing={2} direction="column">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={photoSelected}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                UPLOAD
              </Button>
            </label>
          </Stack>
        )}
      </Box>

      <Box sx={{ display: 'flex', margin: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ wordWrap: 'break-word' }}>
            {profile.fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {!userId ? <ProfileStatus status={status} /> : status}
          </Typography>
          <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
          {isShow ? (
            <ProfileDataForm profile={profile} offEditMode={offEditMode} />
          ) : (
            <ProfileInfo profile={profile} onEditMode={onEditMode} userId={userId} />
          )}
        </CardContent>
      </Box>
    </Card>
  );
};
