import React from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {ProfileType} from "../../../api/api";
import {Avatar, Box, Button, Card, CardContent, Typography} from "@mui/material";
import {blue} from '@mui/material/colors';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import Stack from '@mui/material/Stack';
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {follow, unfollow} from "../../../redux/usersReducer";
import {isFollow} from "../../../redux/profileReducer";
import {useAppDispatch} from "../../../features/hooks/hooks";

type ProfileDetailsPropsType = {
    profile: ProfileType | null
    status: string
    isFriend: boolean
}

export const ProfileDetails: React.FC<ProfileDetailsPropsType> = (props) => {
    const userId = useSelector<AppStateType, number | null>(state => state.auth.id)
    const profileUserId = props.profile?.userId ? props.profile?.userId : 1

    const dispatch = useAppDispatch()

    const followHandler = async () => {
        await dispatch(follow(profileUserId))
        dispatch(isFollow(profileUserId))
    }
    const unfollowHandler = async () => {
        await dispatch(unfollow(profileUserId))
        dispatch(isFollow(profileUserId))
    }

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
                    sx={{width: 151, height: 151, bgcolor: blue[500], margin: 1}}
                />
                {userId !== profileUserId &&
                    <Stack spacing={2} direction="column">
                        {props.isFriend
                            ?
                            <Button variant="outlined"
                                    startIcon={<PersonRemoveIcon/>}
                                    sx={{display: {xs: "none", sm: "flex"}}}
                                    onClick={unfollowHandler}>UNFOLLOW
                            </Button>
                            :
                            <Button variant="contained"
                                    startIcon={<PersonAddIcon/>}
                                    sx={{display: {xs: "none", sm: "flex"}}}
                                    onClick={followHandler}>FOLLOW
                            </Button>
                        }
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