import React from 'react';
import cl from "./User.module.css";
import {NavLink} from "react-router-dom";
import userLogo from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";

export const User: React.FC<any> = ({user}) => {
    return (
        <div className={cl.item}>
            <div className={cl.leftSide}>
                <div className={cl.photo}>
                    <NavLink to={'/' + 1}>
                        <img src={userLogo} alt="User"/>
                    </NavLink>
                </div>
                <div className={cl.description}>
                    <h3>{user.name}</h3>
                    <p>{user.status}</p>
                </div>
            </div>
            <div className={cl.rightSide}>
                <MyButton callback={() => console.log('unfollow')}>Unfollow</MyButton>
            </div>
        </div>
    );
};