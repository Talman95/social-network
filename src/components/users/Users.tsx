import React from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UserType} from "../../redux/usersReducer";
import {Preloader} from "../common/Preloader/Preloader";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    currentPage: number
    pageSize: number
    totalCount: number
    switchPage: (page: number) => void
    isFetching: boolean
}

export class Users extends React.Component<UsersPropsType> {

    render() {
        const mappedUsers = this.props.users.map((u, index) => <User
                key={u.id}
                user={u}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        )

        const pages: number[] = []
        const countPages = Math.ceil(this.props.totalCount / this.props.pageSize)
        for (let i = 1; i <= 15; i++) {
            pages.push(i)
        }

        return (
            <div className={cl.container}>
                <div className={cl.pageWrapper}>
                    {pages.map(p => {
                        return <span
                            className={p === this.props.currentPage ? cl.selectedPage : cl.page}
                            onClick={() => this.props.switchPage(p)}
                        >
                                {p}
                            </span>
                    })}
                </div>
                {this.props.isFetching
                    ? <Preloader/>
                    : mappedUsers
                }
            </div>
        );
    }
}