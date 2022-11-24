import React, { ChangeEvent } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { uploadUserPhoto } from '../../../../store/middlewares/profile/actions';

const Input = styled('input')({
  display: 'none',
});

export const UploadPhoto = () => {
  const dispatch = useDispatch();

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const firstElement = 0;
    const newFile = e.target.files && e.target.files[firstElement];

    if (newFile) {
      dispatch(uploadUserPhoto(newFile));
    }
  };

  return (
    <Stack spacing={2} direction="column">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={onMainPhotoSelected}
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
  );
};
