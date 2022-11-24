import React, { FC } from 'react';

import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';

import { Preloader } from '../../../components/common/Preloader/Preloader';
import { COLOR_BLUE } from '../../../constants/colors';
import { useOutside } from '../../../hooks/useOutside';
import { selectProfile, selectStatus } from '../../../store/selectors/profileSelectors';

import { ButtonsBlock } from './ButtonsBlock/ButtonsBlock';
import { ProfileDataForm } from './ProfileDataForm/ProfileDataForm';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import { UploadPhoto } from './UploadPhoto/UploadPhoto';

type PropsType = {
  userId: string | undefined;
};

export const ProfileDetails: FC<PropsType> = ({ userId }) => {
  const profile = useSelector(selectProfile);
  const status = useSelector(selectStatus);

  const { ref, isShow, setIsShow } = useOutside(false);

  const onEditMode = () => {
    setIsShow(true);
  };

  const offEditMode = () => {
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
          alt={profile?.fullName || 'user'}
          src={profile?.photos.large || ''}
          sx={{ width: 151, height: 151, bgcolor: blue[COLOR_BLUE], margin: 1 }}
        />

        {userId && <ButtonsBlock userId={userId} />}

        {!userId && <UploadPhoto />}
      </Box>

      <Box sx={{ display: 'flex', margin: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ wordWrap: 'break-word' }}>
            {profile?.fullName}
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
