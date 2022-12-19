import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

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
import { useSelector } from 'react-redux';

import { COLOR_BLUE } from '../../../../constants/colors';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addPost } from '../../../../store/actions/profileActions';
import { selectProfile } from '../../../../store/selectors/profileSelectors';

export const WriteField: FC = () => {
  const dispatch = useAppDispatch();

  const profile = useSelector(selectProfile);

  const [message, setMessage] = useState('');

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const onAddPostClick = (): void => {
    const trimMessage = message.trim();

    if (trimMessage === '') {
      return;
    }

    dispatch(addPost(trimMessage));
    setMessage('');
  };

  const onEnterPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onAddPostClick();
      e.preventDefault();
    }
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: blue[COLOR_BLUE] }}
            aria-label="Field for write"
            alt={profile?.fullName}
            src={profile?.photos.small || ''}
          />
        }
        title={profile?.fullName}
        subheader={profile?.aboutMe || ''}
      />

      <CardContent>
        <TextField
          fullWidth
          placeholder={"What's up"}
          multiline
          rows={4}
          value={message}
          onChange={onMessageChange}
          onKeyPress={onEnterPress}
        />
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginRight: '10px' }}
          onClick={onAddPostClick}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};
