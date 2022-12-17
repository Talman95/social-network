import React from 'react';

import { Stack } from '@mui/material';

import { SearchByAccessory } from './SearchByAccessory/SearchByAccessory';
import { SearchByName } from './SearchByName/SearchByName';

export const SearchBox = () => (
  <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
    <SearchByName />

    <SearchByAccessory />
  </Stack>
);
