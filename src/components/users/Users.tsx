import React from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";
import {UserType} from "../../redux/usersReducer";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    currentPage: number
    setCurrentPage: (currentrPage: number) => void
    sizePage: number
    totalCount: number
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

        const onPageChange = (page: number) => {
            this.props.setCurrentPage(page)
        }

        const pages: number[] = []
        const countPages = Math.ceil(this.props.totalCount / this.props.sizePage)
        for (let i = 1; i <= countPages; i++) {
            pages.push(i)
        }

        return (
            <div className={cl.container}>
                <div className={cl.pagination}>
                    {pages.length > 0
                        ?
                        pages.map(p => {
                            return <span
                                className={p === this.props.currentPage ? cl.selectedPage : cl.page}
                                onClick={() => onPageChange(p)}
                            >
                                p
                            </span>
                        })
                        :
                        ''
                    }
                </div>
                {mappedUsers}
            </div>
        );
    }
}