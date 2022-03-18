import React from "react";
import {Header} from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {AuthStateType, setUserData} from "../../redux/authReducer";
import {authAPI} from "../../api/api";


class HeaderContainer extends React.Component<TProps> {
    componentDidMount() {
        authAPI.authMe()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    this.props.setUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
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

const connector = connect(mapStateToProps, {setUserData})

type TProps = ConnectedProps<typeof connector>

export default connector(HeaderContainer)