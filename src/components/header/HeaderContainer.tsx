import React from "react";
import {Header} from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {AuthStateType, logout} from "../../redux/authReducer";
import {ProfileType} from "../../api/api";


class HeaderContainer extends React.Component<TProps> {
    render() {
        return (
            <Header
                login={this.props.login}
                isAuth={this.props.isAuth}
                logout={this.props.logout}
                profile={this.props.profile}
            />
        )
    }
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
    profile: ProfileType | null
}

const mapStateToProps = ({auth}: { auth: AuthStateType }): MapStateToPropsType => ({
    login: auth.login,
    isAuth: auth.isAuth,
    profile: auth.profile,
})

const connector = connect(mapStateToProps, {logout})

type TProps = ConnectedProps<typeof connector>

export default connector(HeaderContainer)