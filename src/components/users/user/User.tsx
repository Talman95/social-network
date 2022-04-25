import React, {FC} from 'react';
import cl from "./User.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";
import {UserType} from "../../../api/api";

type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    pressingInProgress: Array<number>
}

export const User: FC<UserPropsType> = ({user, follow, unfollow, pressingInProgress}) => {
    return (
        <div className={cl.item}>
            <div className={cl.leftSide}>
                <div className={cl.photo}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small ? user.photos.small : userPhoto} alt="User"/>
                    </NavLink>
                </div>
                <div className={cl.description}>
                    <h3>{user.name}</h3>
                    <p>{user.status}</p>
                </div>
            </div>
            <div className={cl.rightSide}>
                {user.followed
                    ?
                    <MyButton
                        disabled={pressingInProgress.some(id => id === user.id)}
                        callback={() => {
                            unfollow(user.id)
                        }}>UNFOLLOW
                    </MyButton>
                    :
                    <MyButton
                        disabled={pressingInProgress.some(id => id === user.id)}
                        callback={() => {
                            follow(user.id)
                        }}>FOLLOW
                    </MyButton>
                }
            </div>
        </div>
    );
};