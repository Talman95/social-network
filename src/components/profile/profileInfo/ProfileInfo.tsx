import React from 'react';
import cl from './ProfileInfo.module.css';
import user from '../../../assets/images/userLogo.png';
import github from '../../../assets/images/logos/GitHub-Mark-32px.png';

export const ProfileInfo = () => {
    return (
        <div className={cl.profile_info}>
            <div className={cl.user}>
                <div className={cl.user_img}>
                    <img src={user} alt={'User'}/>
                </div>
                <div className={cl.name}>
                    <p>User Name</p>
                    <span className={cl.status}>status</span>
                </div>
            </div>

            <div className={cl.contacts}>
                <div className={cl.title}>
                    <h3 >Contacts</h3>
                </div>
                <a>
                    <div className={cl.link}>
                        <img src={github} alt={'github'}/>
                        <span>GitHub</span>
                    </div>
                </a>
            </div>
        </div>
    )
        ;
};