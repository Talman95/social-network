import React from 'react';
import {CircularProgress} from "@mui/material";

export const Preloader = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </div>
    )
}