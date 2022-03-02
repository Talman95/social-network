import React from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UserType} from "../../redux/usersReducer";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

export class Users extends React.Component<UsersPropsType> {

    render() {
        const mappedUsers = this.props.users.map((u, index) => <User
                key={index}
                user={u}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        )

        return (
            <div className={cl.container}>
                {mappedUsers}
            </div>
        );
    }
}