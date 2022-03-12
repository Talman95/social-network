import React from 'react';
import cl from "./ProfileDetails.module.css";
import userPhoto from "../../../assets/images/userLogo.png";
import check_job from "../../../assets/images/check_job.png";
import {MyButton} from "../../UI/button/MyButton";
import follow from "../../../assets/images/follow.png";
import message from "../../../assets/images/message.png";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileDetailsPropsType = {
    profile: ProfileType | null
}

export const ProfileDetails: React.FC<ProfileDetailsPropsType> = ({profile}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={cl.details}>
            <div className={cl.left_pd}>
                <div className={cl.left_row}>
                    <img
                        src={profile.photos.large ? profile.photos.large : userPhoto}
                        alt={'User'}
                        className={cl.profile_image}
                    />
                    <div>
                        <h3>{profile.fullName}</h3>
                        <p>set the status</p>
                    </div>
                    {profile.lookingForAJob &&
                        <img src={check_job} alt={'Check looking for a job'} className={cl.check_job}/>
                    }
                </div>
            </div>
            <div className={cl.right_pd}>
                <MyButton callback={() => console.log('Follow')}>
                    <img src={follow} alt={'Follow button'}/>
                    Follow
                </MyButton>
                <MyButton callback={() => console.log('Message')}>
                    <img src={message} alt={'Start to message button'}/>
                    Message
                </MyButton>
            </div>
        </div>
    );
};