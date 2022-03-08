import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {follow, setCurrentPage, setTotalMembers, setUsers, unfollow, UserType} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalCount: number
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalMembers: (totalCount: number) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType


class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalMembers(response.data.totalCount)
        })
    }

    switchPage = (page: number) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
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
            />)
    }
}

export const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.users.users,
        currentPage: state.users.currentPage,
        pageSize: state.users.pageSize,
        totalCount: state.users.totalCount,
    }
}

export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage, setTotalMembers
})(UsersContainer)



// export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         follow: (userID) => {
//             dispatch(follow(userID))
//         },
//         unfollow: (userID) => {
//             dispatch(unfollow(userID))
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users))
//         }
//     }
// }