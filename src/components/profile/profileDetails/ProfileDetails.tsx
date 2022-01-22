import React from 'react';
import cl from "./ProfileDetails.module.css";
import user from "../../../assets/images/userLogo.png";
import check_job from "../../../assets/images/check_job.png";
import {MyButton} from "../../UI/button/MyButton";
import follow from "../../../assets/images/follow.png";
import message from "../../../assets/images/message.png";

export const ProfileDetails: React.FC<any> = (props) => {
    return (
        <div className={cl.details}>
            <div className={cl.left_pd}>
                <div className={cl.left_row}>
                    <img src={user} alt={'User'} className={cl.profile_image}/>
                    <div>
                        <h3>Talmanof Roman</h3>
                        <p>set the status</p>
                    </div>
                    <img src={check_job} alt={'Check looking for a job'} className={cl.check_job}/>
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