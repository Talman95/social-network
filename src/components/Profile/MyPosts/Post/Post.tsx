import React, { FC } from 'react';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { COLOR_BLUE } from '../../../../constants/colors';
import { ProfileType } from '../../../../types/ProfileType';
import { Preloader } from '../../../common/Preloader/Preloader';

type PropsType = {
  id: number;
  message: string;
  picture: string;
  deletePost: (postID: number) => void;
  profile: ProfileType | null;
};

export const Post: FC<PropsType> = ({ id, message, picture, deletePost, profile }) => {
  const onDeletePost = (postID: number) => {
    deletePost(postID);
  };

  if (!profile) {
    return <Preloader />;
  }

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profile.photos.large || ''}
            sx={{ bgcolor: blue[COLOR_BLUE] }}
            alt={profile.fullName}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={() => onDeletePost(id)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={profile.fullName}
        subheader="May 8, 2022"
      />
      {picture && (
        <CardMedia component="img" height="20%" image={picture} alt="Post media" />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};
