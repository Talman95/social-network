import React from 'react';
import loader from './../../../assets/images/loader.gif';

export const Preloader = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <img src={loader}/>
        </div>
    );
};