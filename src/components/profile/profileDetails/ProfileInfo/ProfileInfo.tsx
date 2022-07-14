import React, {FC} from 'react';
import {styled} from "@mui/material/styles";
import {ContactsType, ProfileType} from "../../../../api/api";
import {Box, Divider, Typography} from '@mui/material';

type ProfileInfoType = {
    profile: ProfileType
}

const TitleContainer = styled('span')(({theme}) => ({
    ...theme.typography.body1,
    fontWeight: '400',
    width: '140px',
}));
const ValueContainer = styled('span')(({theme}) => ({
    ...theme.typography.body1,
    wordWrap: "break-word",
}));
const ContactContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
    wordWrap: "break-word",
}))

export const ProfileInfo: FC<ProfileInfoType> = ({profile}) => {
    return (
        <>
            {profile.lookingForAJob && <ContactContainer>
                <TitleContainer>Looking for a job:</TitleContainer>
                <ValueContainer>{profile.lookingForAJobDescription}</ValueContainer>
            </ContactContainer>}

            <ContactContainer>
                <TitleContainer>About me:</TitleContainer>
                <ValueContainer>{profile.aboutMe}</ValueContainer>
            </ContactContainer>
            <Divider sx={{marginTop: '15px', marginBottom: '15px'}}/>
            <Typography component="div" variant={'h6'} sx={{fontWeight: "400"}}>
                Contacts
            </Typography>
            {Object
                .keys(profile.contacts)
                .map(key => <Contact key={key} contactTitle={key}
                                     contactValue={profile.contacts[key as keyof ContactsType]}/>)
            }
        </>
    )
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <ContactContainer>
            <TitleContainer>{contactTitle}:</TitleContainer>
            <ValueContainer>{contactValue}</ValueContainer>
        </ContactContainer>
    )
}