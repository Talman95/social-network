import React from 'react';
import classes from './Header.module.css';
import menu from './../../assets/images/menu.png';
import search from './../../assets/images/search.png';
import right_menu from './../../assets/images/right-menu.png';

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.header_left}>
                <img src={menu} alt="menu" />
            </div>
                <div className={classes.header_right}>
                    <div className={classes.search_box}>
                        <a className={classes.search_button}>
                            <img src={search} alt="search button"/>
                        </a>
                        <input type="text" placeholder="Search ..." />
                    </div>
                    <div className={classes.right_menu}>
                        <img src={right_menu} alt='right menu' />
                    </div>
                </div>
        </div>
    );
};

export default Header;