import React from 'react';

import { NavLink } from 'react-router-dom';

import userLogo from '../../../../assets/images/userLogo.png';

import cl from './DialogItem.module.css';

type PropsType = {
  id: number;
  name: string;
  lastMessage: string;
  notice: number;
  date: string;
};

const DialogItem: React.FC<PropsType> = ({ id, name, lastMessage, date, notice }) => (
  <NavLink to={`/messages/${id}`}>
    <div className={cl.chat}>
      <div className={cl.chat_left}>
        <div className={cl.chat_img}>
          <img src={userLogo} alt="user" />
        </div>
        <div className={cl.contact_info}>
          <span className={cl.contact_name}>{name}</span>
          <span className={cl.contact_mes}>{lastMessage}</span>
        </div>
      </div>
      <div className={cl.chat_right}>
        <span className={cl.chat_date}>{date}</span>
        <span className={cl.chat_notice}>{notice}</span>
      </div>
    </div>
  </NavLink>
);

export default DialogItem;
