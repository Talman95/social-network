import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {
    follow,
    setCurrentPage,
    setTotalMembers,
    setUsers,
    toggleIsFetching,
    togglePressingInProgress,
    unfollow,
    UserType
} from "../../redux/usersReducer";
import React from "react";
import {usersAPI} from "../../api/api";

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    pressingInProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalMembers: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    togglePressingInProgress: (isPressed: boolean, userId: number) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalMembers(data.totalCount)
            })
    }

    switchPage = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return (
            <Users
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalCount={this.props.totalCount}
                switchPage={this.switchPage}
                isFetching={this.props.isFetching}
                pressingInProgress={this.props.pressingInProgress}
                togglePressingInProgress={this.props.togglePressingInProgress}
            />)
    }
}

export const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.users.users,
        currentPage: state.users.currentPage,
        pageSize: state.users.pageSize,
        totalCount: state.users.totalCount,
        isFetching: state.users.isFetching,
        pressingInProgress: state.users.pressingInProgress,
    }
}

export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setTotalMembers, toggleIsFetching, togglePressingInProgress
})(UsersContainer)
