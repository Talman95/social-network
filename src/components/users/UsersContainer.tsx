import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {follow, setCurrentPage, setUsers, unfollow, UserType} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    sizePage: number
    totalCount: number
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
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
                currentPage={this.props.currentPage}
                setCurrentPage={this.props.setCurrentPage}
                sizePage={this.props.sizePage}
                totalCount={this.props.totalCount}
            />)
    }
}

export const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.users.users,
        currentPage: state.users.currentPage,
        sizePage: state.users.sizePage,
        totalCount: state.users.totalCount,
    }
}

export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage
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