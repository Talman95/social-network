import React, {FC} from 'react';
import {addPost, deletePost, ProfileActionsType, ProfileStateType, updateMessage} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from 'redux';

export const MyPostsContainer: FC = () => {
    const dispatch = useDispatch<Dispatch<ProfileActionsType>>()

    const {posts, postMessage, profile} = useSelector<AppStateType, ProfileStateType>(state => state.profile)

    const deletePostHandler = (postId: number) => {
        dispatch(deletePost(postId))
    }
    const updateMessageHandler = (newMessage: string) => {
        dispatch(updateMessage(newMessage))
    }
    const addPostHandler = () => {
        dispatch(addPost())
    }

    return (
        <MyPosts
            posts={posts}
            addPost={addPostHandler}
            deletePost={deletePostHandler}
            postMessage={postMessage}
            updateMessage={updateMessageHandler}
            profile={profile}
        />
    )
}