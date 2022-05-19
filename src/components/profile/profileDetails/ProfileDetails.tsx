import React from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {ProfileType} from "../../../api/api";
import {Avatar, Box, Button, ButtonGroup, Card, CardContent, Typography} from "@mui/material";
import {blue} from '@mui/material/colors';

type ProfileDetailsPropsType = {
    profile: ProfileType | null
    status: string
}

export const ProfileDetails: React.FC<ProfileDetailsPropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <Card sx={{display: 'flex', alignItems: "center", justifyContent: "center", margin: 1}}>
            <Avatar
                alt={props.profile.fullName}
                src={props.profile.photos.large ? props.profile.photos.large : ''}
                sx={{width: {xs: 90, sm: 151}, height: {xs: 90, sm: 151}, bgcolor: blue[500], margin: 1}}
            />
            <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                <Box sx={{display: 'flex', flexDirection: 'row', margin: 1}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h6">
                            {props.profile.fullName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            <ProfileStatus status={props.status}/>
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{display: {xs: 'none', sm: 'flex'}, alignItems: 'baseline', pt: 3, pl: 1}}>
                    <ButtonGroup variant="contained" sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Button>Follow</Button>
                        <Button>Message</Button>
                    </ButtonGroup>
                    {/*<IconButton aria-label={"start messaging"}*/}
                    {/*            size={"small"}*/}
                    {/*            color={"primary"}*/}
                    {/*>*/}
                    {/*    <MessageIcon/>*/}
                    {/*</IconButton>*/}
                </Box>
            </Box>
        </Card>
    );
};