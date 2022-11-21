import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import userLogo from '../../../../assets/images/userLogo.png';

import cl from './ChatHeader.module.css';

type PropsType = {
  name: string;
  status: string;
};

export const ChatHeader: FC<PropsType> = ({ name, status }) => (
  <div className={cl.header}>
    <NavLink to="/profile">
      <div className={cl.header_left}>
        <img src={userLogo} alt="user" />
        <div className={cl.chat_name}>
          <span className={cl.contact_name}>{name}</span>
          <span className={cl.contact_status}>{status}</span>
        </div>
      </div>
    </NavLink>
    <div className={cl.header_right} />
  </div>
);
