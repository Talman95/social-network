import React from 'react';
import user from "../../../assets/images/userLogo.png";
import cl from './Friend.module.css';

type PropsType = {
    name: string
    status: string
}

export const Friend: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.friend}>
            <div className={cl.online}>
                <img src={user} alt="User logo"/>
            </div>
            <div className={cl.info}>
                <p>{props.name}</p>
                <span>{props.status}</span>
            </div>
        </div>
    );
};