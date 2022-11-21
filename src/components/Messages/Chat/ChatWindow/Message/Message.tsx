import React, { FC } from 'react';

import avatar from '../../../../../assets/images/userLogo.png';

import cl from './Message.module.css';

type PropsType = {
  name: string;
  message: string;
  time: string;
};

export const Message: FC<PropsType> = ({ name, message, time }) => (
  <div className={cl.message}>
    <img src={avatar} alt="Friend" className={cl.profile_img} />
    <div className={cl.message_bubble}>
      <div className={cl.message_body}>
        <span className={cl.name}>{name}</span>
        <span className={cl.message_send}>{message}</span>
      </div>
      <span className={cl.time}>{time}</span>
    </div>
  </div>
);
