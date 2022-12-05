import React, { FC } from 'react';

import { ContactContainer, TitleContainer, ValueContainer } from './styles';

type PropsType = {
  title: string;
  value: string | null;
};

export const Contact: FC<PropsType> = ({ title, value }) => (
  <ContactContainer>
    <TitleContainer>{title}:</TitleContainer>
    <ValueContainer>{value}</ValueContainer>
  </ContactContainer>
);
