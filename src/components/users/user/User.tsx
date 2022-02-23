import React, {FC} from 'react';
import cl from "./User.module.css";
import {NavLink} from "react-router-dom";
import userLogo from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";
import {UserType} from "../../../redux/usersReducer";

type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export const User: FC<UserPropsType> = (
    {
        user, follow, unfollow
    }) => {
    return (
        <div className={cl.item}>
            <div className={cl.leftSide}>
                <div className={cl.photo}>
                    <NavLink to={'/profile/' + 1}>
                        <img src={userLogo} alt="User"/>
                    </NavLink>
                </div>
                <div className={cl.description}>
                    <h3>{user.name}</h3>
                    <p>{user.status}</p>
                </div>
            </div>
            <div className={cl.rightSide}>
                {user.followed
                    ? <MyButton callback={() => unfollow(user.id)}>UNFOLLOW</MyButton>
                    : <MyButton callback={() => follow(user.id)}>FOLLOW</MyButton>
                }
            </div>
        </div>
    );
};