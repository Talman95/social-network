import React, { FC } from 'react';

import { TextField } from '@mui/material';

import { ContactContainer, TitleContainer, ValueContainer } from './styles';

type ContactType = {
  id: string;
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
};

export const Contact: FC<ContactType> = ({ id, title, value, onChange }) => (
  <ContactContainer>
    <TitleContainer>{title}:</TitleContainer>
    <ValueContainer>
      <TextField
        id={id}
        variant="standard"
        fullWidth
        name={title}
        onChange={onChange}
        value={value}
      />
    </ValueContainer>
  </ContactContainer>
);
