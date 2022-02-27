import React, {FC} from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UsersContainerPropsType} from "./UsersContainer";
import axios from "axios";

export const Users: FC<UsersContainerPropsType> = (props) => {

    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }

    const mappedUsers = props.users.map((u, index) => <User
            key={index}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
        />
    )

    return (
        <div className={cl.container}>
            {mappedUsers}
        </div>
    );
};