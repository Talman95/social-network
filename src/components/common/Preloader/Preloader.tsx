import React from 'react';

import { CircularProgress } from '@mui/material';

import { ReturnComponentType } from '../../../types/ReturnComponentType';

export const Preloader = (): ReturnComponentType => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}
  >
    <CircularProgress />
  </div>
);
