import React, {FC} from 'react';
import cl from "./User.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";
import {UserType} from "../../../redux/usersReducer";
import axios from 'axios';

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
                        callback={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) {
                                    unfollow(user.id)
                                }
                            })
                        }}> UNFOLLOW
                    </MyButton>
                    :
                    <MyButton
                        callback={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
                                }
                            }).then(response => {
                                if (response.data.resultCode === 0) {
                                    follow(user.id)
                                }
                            })
                        }}> FOLLOW
                    </MyButton>
                }
            </div>
        </div>
    );
};