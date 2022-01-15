import React from 'react';
import cl from './Sidebar.module.css';
import {FollowingType} from "../../redux/state";
import {Friend} from "./Friend/Friend";

type PropsType = {
    sidebar: FollowingType[]
}

export const Sidebar: React.FC<PropsType> = (props) => {

    const mapFriends = props.sidebar.map(f =>
        <Friend key={f.id} name={f.name} status={f.status}/>)

    return (
        <div className={cl.sidebar}>
            <div className={cl.sidebar_tittle}>
                <h4>Following | 3</h4>
            </div>
            <div className={cl.online_list}>
                {mapFriends}
            </div>
        </div>
    );
};