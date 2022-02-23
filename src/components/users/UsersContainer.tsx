import {Users} from "./Users";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {followAC, setUsersAC, unfollowAC, UserType} from "../../redux/usersReducer";
import {Dispatch} from "redux";

type MapStatePropsType = {
    users: Array<UserType>
}
type MapDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

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

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)