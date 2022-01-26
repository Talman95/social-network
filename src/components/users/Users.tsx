import React from 'react';
import cl from './Users.module.css';
import {User} from "./User/User";


export const Users: React.FC<any> = (props) => {
    const users = [
        {name: 'Dmitrii Antonov', status: 'Hi'},
        {name: 'Dmitrii Antonov', status: 'Hi'}
    ]
    const mappedUsers = users.map(u => <User user={u}/>)

    return (
        <div className={cl.container}>
            {mappedUsers}
        </div>
    );
};