import {Users} from "./Users";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../../redux/store";
import {follow, getUsers, setCurrentPage, unfollow, UserType} from "../../redux/usersReducer";
import React from "react";

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    pressingInProgress: Array<number>
}

class UsersContainer extends React.Component<UsersContainerProps> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    switchPage = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
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

const connector = connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, getUsers,
})

type UsersContainerProps = ConnectedProps<typeof connector>;

export default connector(UsersContainer);