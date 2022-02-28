import React from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UsersContainerPropsType} from "./UsersContainer";
import axios from "axios";


export class Users extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

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