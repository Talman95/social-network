import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import { Button, Card, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { chatStatus } from '../../../enums/chatStatus';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { sendMessage } from '../../../store/middlewares/chat';
import { selectStatus } from '../../../store/selectors/chatSelectors';

export const AddMessageBox: FC = () => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectStatus);

  const [text, setText] = useState('');

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setText(e.currentTarget.value);
  };

  const onSendClick = (): void => {
    const trimmedText = text.trim();

    if (trimmedText === '') {
      return;
    }

    dispatch(sendMessage(trimmedText));
    setText('');
  };

  const onEnterPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSendClick();
      e.preventDefault();
    }
  };

  return (
    <Card sx={{ margin: 1, display: 'flex' }}>
      <TextField
        placeholder="Message..."
        multiline
        rows={4}
        value={text}
        onChange={onTextChange}
        onKeyPress={onEnterPress}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={onSendClick}
        disabled={status !== chatStatus.READY}
      >
        Send
      </Button>
    </Card>
  );
};
