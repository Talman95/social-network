import React from "react";
import {Header} from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {AuthStateType, getAuthUserData, logout} from "../../redux/authReducer";


class HeaderContainer extends React.Component<TProps> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header
                login={this.props.login}
                isAuth={this.props.isAuth}
                logout={this.props.logout}
            />
        )
    }
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

const mapStateToProps = ({auth}: { auth: AuthStateType }): MapStateToPropsType => ({
    login: auth.login,
    isAuth: auth.isAuth,
})

const connector = connect(mapStateToProps, {getAuthUserData, logout})

type TProps = ConnectedProps<typeof connector>

export default connector(HeaderContainer)