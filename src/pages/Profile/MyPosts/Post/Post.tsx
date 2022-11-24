import React, { FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';

import { COLOR_BLUE } from '../../../../constants/colors';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deletePost } from '../../../../store/actions/profileActions';
import { selectProfile } from '../../../../store/selectors/profileSelectors';

type PropsType = {
  id: number;
  message: string;
};

export const Post: FC<PropsType> = ({ id, message }) => {
  const dispatch = useAppDispatch();

  const profile = useSelector(selectProfile);

  const onDeletePostClick = () => {
    dispatch(deletePost(id));
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profile?.photos.large || ''}
            sx={{ bgcolor: blue[COLOR_BLUE] }}
            alt={profile?.fullName}
          />
        }
        action={
          <IconButton aria-label="delete-post" onClick={onDeletePostClick}>
            <CloseIcon />
          </IconButton>
        }
        title={profile?.fullName}
        subheader={profile?.aboutMe}
      />

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
