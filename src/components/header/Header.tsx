import React, {FC} from 'react';
import cl from './Header.module.css';
import menu from './../../assets/images/menu.png';
import user from '../../assets/images/userLogo.png'
import {MyInput} from "../UI/input/MyInput";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
}

export const Header: FC<HeaderPropsType> = ({login, isAuth}) => {
    return (
        <div className={cl.header}>
            {isAuth
                ?
                <div className={cl.header_user_icon}>
                    <a href={'/profile'}>
                        <img src={user} alt="User"/>
                        <p className={cl.name}>
                            {login}
                        </p>
                    </a>
                </div>
                :
                <div className={cl.header_user_icon}>
                    Login
                </div>
            }

            <div className={cl.header_right}>
                <div className={cl.input}>
                    <MyInput/>
                </div>
                <div className={cl.right_menu}>
                    <img src={menu} alt='right menu'/>
                </div>
            </div>
        </div>
    );
};