import React, { ChangeEvent, useState } from 'react';

import { Button, Card, TextField } from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { sendMessage } from '../../../store/middlewares/chat/thunks';

export const AddMessageBox = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const onSendClick = () => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
      return;
    }

    dispatch(sendMessage(trimmedText));
    setText('');
  };

  return (
    <Card sx={{ margin: 1, display: 'flex' }}>
      <TextField
        placeholder="Message..."
        multiline
        rows={4}
        defaultValue={text}
        onChange={onTextChange}
        fullWidth
      />
      <Button variant="contained" onClick={onSendClick}>
        Send
      </Button>
    </Card>
  );
};
