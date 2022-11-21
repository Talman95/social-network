import React, { ChangeEvent, FC, KeyboardEvent } from 'react';

import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

import { COLOR_BLUE } from '../../../../constants/colors';
import { ProfileType } from '../../../../types/ProfileType';
import { Preloader } from '../../../common/Preloader/Preloader';

type PropsType = {
  postMessage: string;
  updateMessage: (newMessage: string) => void;
  addPost: () => void;
  profile: ProfileType | null;
};

export const WriteField: FC<PropsType> = ({
  postMessage,
  updateMessage,
  addPost,
  profile,
}) => {
  const onUpdateMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateMessage(e.currentTarget.value);
  };
  const onAddPost = () => addPost();
  const onEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      addPost();
    }
  };

  if (!profile) {
    return <Preloader />;
  }

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: blue[COLOR_BLUE] }}
            aria-label="Field for write"
            alt={profile.fullName}
            src={profile.photos.small ? profile.photos.small : ''}
          />
        }
        title={profile.fullName}
        subheader={profile.aboutMe || ''}
      />
      <CardContent>
        <TextField
          fullWidth
          placeholder={"What's up"}
          multiline
          rows={4}
          value={postMessage}
          onChange={onUpdateMessage}
          onKeyPress={onEnterPress}
        />
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginRight: '10px' }}
          onClick={onAddPost}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};
