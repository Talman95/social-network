import React, {FC} from 'react';
import cl from "./User.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";
import {UserType} from "../../../redux/usersReducer";
import {usersAPI} from "../../../api/api";

type UserPropsType = {
    user: UserType
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    pressingInProgress: Array<number>
    togglePressingInProgress: (isPressed: boolean, userId: number) => void
}

export const User: FC<UserPropsType> = (
    {
        user, follow, unfollow,
        pressingInProgress, togglePressingInProgress
    }) => {
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
                            togglePressingInProgress(true, user.id)
                            usersAPI.unfollow(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        unfollow(user.id)
                                    }
                                    togglePressingInProgress(false, user.id)
                                })
                        }}>UNFOLLOW
                    </MyButton>
                    :
                    <MyButton
                        disabled={pressingInProgress.some(id => id === user.id)}
                        callback={() => {
                            togglePressingInProgress(true, user.id)
                            usersAPI.follow(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        follow(user.id)
                                    }
                                    togglePressingInProgress(false, user.id)
                                })
                        }}>FOLLOW
                    </MyButton>
                }
            </div>
        </div>
    );
};