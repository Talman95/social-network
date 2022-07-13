import React, {ChangeEvent} from 'react';
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
import {isFollow, uploadUserPhoto} from "../../../redux/profileReducer";
import {useAppDispatch} from "../../../features/hooks/hooks";
import {styled} from "@mui/material/styles";
import {PhotoCamera} from "@mui/icons-material";

type ProfileDetailsPropsType = {
    profile: ProfileType | null
    status: string
    isFriend: boolean
}

const Input = styled('input')({
    display: 'none',
});

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
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            dispatch(uploadUserPhoto(newFile))
        }
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
                    alt={props.profile.fullName || 'user'}
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
                {userId === profileUserId &&
                    <Stack spacing={2} direction="column">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file"
                                   onChange={onMainPhotoSelected}/>
                            <Button variant="contained" component="span"
                                    startIcon={<PhotoCamera/>}
                                    sx={{display: {xs: "none", sm: "flex"}}}>
                                UPLOAD
                            </Button>
                        </label>
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
        </Card>
    );
};