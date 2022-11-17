import React, {ChangeEvent, FC} from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {ProfileType} from "../../../api/types";
import {Avatar, Box, Button, Card, CardContent, Divider, Typography} from "@mui/material";
import {blue} from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {styled} from "@mui/material/styles";
import {PhotoCamera} from "@mui/icons-material";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {useOutside} from "../../../features/hooks/useOutside";

type ProfileDetailsPropsType = {
    profile: ProfileType | null
    status: string
    isFriend: boolean
    userId: string | undefined
    follow: () => void
    unfollow: () => void
    photoSelected: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = styled('input')({
    display: 'none',
});

export const ProfileDetails: FC<ProfileDetailsPropsType> = ({
                                                                profile,
                                                                status,
                                                                isFriend,
                                                                userId,
                                                                follow,
                                                                unfollow,
                                                                photoSelected,
                                                            }) => {
    const {ref, isShow, setIsShow} = useOutside(false)
    const onEditMode = () => {
        setIsShow(true)
    }
    const offEditMode = () => {
        setIsShow(false)
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <Card sx={{
            display: "flex",
            margin: 1,
            padding: {sm: 2},
            flexDirection: {xs: "column", sm: "inherit"},
            alignItems: {xs: "center", sm: "inherit"}
        }} ref={ref}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Avatar
                    alt={profile.fullName || 'user'}
                    src={profile.photos.large || ''}
                    sx={{width: 151, height: 151, bgcolor: blue[500], margin: 1}}
                />
                {userId &&
                    <Stack spacing={2} direction="column">
                        {isFriend
                            ?
                            <Button variant="outlined"
                                    startIcon={<PersonRemoveIcon/>}
                                    sx={{display: {xs: "none", sm: "flex"}}}
                                    onClick={unfollow}>UNFOLLOW
                            </Button>
                            :
                            <Button variant="contained"
                                    startIcon={<PersonAddIcon/>}
                                    sx={{display: {xs: "none", sm: "flex"}}}
                                    onClick={follow}>FOLLOW
                            </Button>
                        }
                        <Button variant="contained">Message</Button>
                    </Stack>
                }
                {!userId &&
                    <Stack spacing={2} direction="column">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file"
                                   onChange={photoSelected}/>
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
                    <Typography component="div" variant="h5" sx={{wordWrap: "break-word"}}>
                        {profile.fullName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {!userId
                            ? <ProfileStatus status={status}/>
                            : status
                        }
                    </Typography>
                    <Divider sx={{marginTop: '15px', marginBottom: '15px'}}/>
                    {isShow
                        ? <ProfileDataForm profile={profile} offEditMode={offEditMode}/>
                        : <ProfileInfo profile={profile} onEditMode={onEditMode} userId={userId}/>
                    }
                </CardContent>
            </Box>
        </Card>
    )
}