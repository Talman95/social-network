import React, { ChangeEvent, FC, memo } from 'react';

import { TextField } from '@mui/material';

import { ContactContainer, TitleContainer, ValueContainer } from './styles';

type PropsType = {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
};

export const Contact: FC<PropsType> = memo(({ title, name, value, onChange }) => {
  const id = `contacts.${name}`;

  return (
    <ContactContainer>
      <TitleContainer>{title}:</TitleContainer>
      <ValueContainer>
        <TextField
          id={id}
          variant="standard"
          fullWidth
          name={id}
          onChange={onChange}
          value={value}
        />
      </ValueContainer>
    </ContactContainer>
  );
});
