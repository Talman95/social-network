import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {ProfileStateType, ProfileType, setUserProfile} from "../../redux/profileReducer";
import {connect, ConnectedProps} from "react-redux";

class ProfileContainer extends React.Component<TProps> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/2')
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
            />
        )
    }
};

type mapStateToPropsType = {
    profile: ProfileType | null
}

const mapStateToProps = ({profile}: { profile: ProfileStateType }): mapStateToPropsType => ({
    profile: profile.profile,
})

const connector = connect(mapStateToProps, {
    setUserProfile,
})

type TProps = ConnectedProps<typeof connector>;

export default connector(ProfileContainer)