import React, { ChangeEvent, FC, memo } from 'react';

import { Grid, TextField, Typography } from '@mui/material';

type PropsType = {
  title: string;
  name: string;
  onChange: (e: ChangeEvent<any>) => void;
  value: string;
};

export const Contact: FC<PropsType> = memo(({ title, name, onChange, value }) => (
  <>
    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {title}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <TextField
        id={title}
        variant="standard"
        fullWidth
        name={name}
        onChange={onChange}
        value={value}
      />
    </Grid>
  </>
));
