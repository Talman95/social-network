import React from 'react';
import { useSelector } from 'react-redux';
import { Settings } from './Settings';
import {AppStateType} from "../../redux/store";
import {ProfileType} from "../../api/api";

export const SettingsContainer = () => {
    const profile = useSelector<AppStateType, ProfileType | null>(state => state.profile.profile)

    return (
       <Settings/>
    );
};