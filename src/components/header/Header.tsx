import React, {FC} from 'react';
import cl from './Header.module.css';
import menu from './../../assets/images/menu.png';
import user from '../../assets/images/userLogo.png'
import {MyInput} from "../UI/input/MyInput";
import {MyButton} from "../UI/button/MyButton";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

export const Header: FC<HeaderPropsType> = ({login, isAuth, logout}) => {
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
                    LogIn
                </div>
            }

            <div className={cl.header_right}>
                <div className={cl.input}>
                    <MyInput/>
                </div>
                <div className={cl.right_menu}>
                    <img src={menu} alt='right menu'/>
                    {isAuth &&
                        <MyButton callback={logout}>Log Out</MyButton>
                    }
                </div>
            </div>
        </div>
    );
};