import React from 'react';
import cl from './Users.module.css';
import {NavLink} from "react-router-dom";
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";

export const Users = () => {
    return (
        <div className={cl.container}>
            <div className={cl.item}>
                <div className={cl.leftSide}>
                    <NavLink to={'/' + 1}>
                        <img src={user} alt="User photo"/>
                    </NavLink>
                    <div>
                        <MyButton callback={() => console.log('unfollow')}>Unfollow</MyButton>
                    </div>
                </div>
                <div className={cl.rightSide}>
                    <div>
                        <div>Dmitrii Antonov</div>
                        <div>hello everyone!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};