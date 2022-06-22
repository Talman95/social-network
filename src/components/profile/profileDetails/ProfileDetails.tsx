import React from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {ProfileType} from "../../../api/api";
import {Avatar, Box, Button, Card, CardContent, Typography} from "@mui/material";
import {blue} from '@mui/material/colors';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import Stack from '@mui/material/Stack';

type ProfileDetailsPropsType = {
    profile: ProfileType | null
    status: string
}

export const ProfileDetails: React.FC<ProfileDetailsPropsType> = (props) => {
    const userId = useSelector<AppStateType, number | null>(state => state.auth.id)
    const profileUserId = useSelector<AppStateType, number | undefined>(state => state.profile.profile?.userId)


    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <Card sx={{
            display: "flex",
            margin: 1,
            padding: {sm: 2},
            flexDirection: {xs: "column", sm: "inherit"},
            alignItems: {xs: "center", sm: "inherit"}
        }}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Avatar
                    alt={props.profile.fullName}
                    src={props.profile.photos.large ? props.profile.photos.large : ''}
                    sx={{width: {xs: 151, sm: 151}, height: {xs: 151, sm: 151}, bgcolor: blue[500], margin: 1}}
                />
                {userId !== profileUserId &&
                    <Stack spacing={1} direction="column">
                        <Button variant="contained">Follow</Button>
                        <Button variant="contained">Message</Button>
                    </Stack>
                }
            </Box>

            <Box sx={{display: 'flex', margin: 1}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h6" sx={{wordWrap: "break-word"}}>
                        {props.profile.fullName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {userId === profileUserId
                            ? <ProfileStatus status={props.status}/>
                            : props.status
                        }

                    </Typography>
                </CardContent>
            </Box>
            {/*<Box sx={{display: {xs: 'none', sm: 'flex'}, alignItems: 'baseline', pt: 3, pl: 1}}>*/}
            {/*    <ButtonGroup variant="contained" sx={{display: {xs: 'none', sm: 'block'}}}>*/}
            {/*        <Button>Follow</Button>*/}
            {/*        <Button>Message</Button>*/}
            {/*    </ButtonGroup>*/}
            {/*    <IconButton aria-label={"start messaging"}*/}
            {/*                size={"small"}*/}
            {/*                color={"primary"}*/}
            {/*    >*/}
            {/*        <MessageIcon/>*/}
            {/*    </IconButton>*/}
            {/*</Box>*/}
        </Card>
    );
};