import React, {FC} from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UsersContainerPropsType} from "./UsersContainer";

export const Users: FC<UsersContainerPropsType> = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, name: 'Roman', status: "Boss", photos: {small: 'small', large: 'large'}, followed: false},
            {id: 2, name: 'Dmitrii', status: "Boss too", photos: {small: 'small', large: 'large'}, followed: true},
            {id: 3, name: 'Ann', status: "Boss too", photos: {small: 'small', large: 'large'}, followed: true}
        ])
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