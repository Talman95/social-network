import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../redux/usersReducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";

type MapStatePropsType = {
    users: Array<UserType>
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <Users
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />)
    }
}

export const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.users.users
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)