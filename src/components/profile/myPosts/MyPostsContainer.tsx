import React, {FC} from 'react';
import {addPost, deletePost, ProfileActionTypes, updateMessage} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from 'redux';

export const MyPostsContainer: FC = () => {
    const dispatch = useDispatch<Dispatch<ProfileActionTypes>>()

    const {posts, postMessage, profile} = useSelector((state: AppStateType) => state.profile)

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