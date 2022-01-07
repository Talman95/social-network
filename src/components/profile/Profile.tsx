import React from 'react';
import classes from './Profile.module.css';

export const Profile: React.FC<any> = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.content}>
                <p>Profile</p>
            </div>
        </div>
    );
};