import React, {FC} from 'react';
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../../api/types";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {blue} from '@mui/material/colors';

type PropsType = {
    id: number
    message: string
    picture: string
    deletePost: (postID: number) => void
    profile: ProfileType | null
}

export const Post: FC<PropsType> = (
    {
        id, message, picture, deletePost, profile
    }
) => {

    const onDeletePost = (postID: number) => {
        deletePost(postID);
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <Card sx={{margin: 1}}>
            <CardHeader
                avatar={
                    <Avatar
                        src={profile.photos.large || ''}
                        sx={{bgcolor: blue[500]}}
                        alt={profile.fullName}
                    />
                }
                action={
                    <IconButton aria-label={"settings"}>
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={profile.fullName}
                subheader={"May 8, 2022"}
            />
            {picture &&
                <CardMedia
                    component={"img"}
                    height={"20%"}
                    image={picture}
                    alt={"Post media"}
                />
            }
            <CardContent>
                <Typography variant={"body2"} color={"text.secondary"}>
                    {message}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder/>}
                        checkedIcon={<Favorite sx={{color: "red"}}/>}
                    />
                </IconButton>
            </CardActions>
        </Card>
    );
};