import React, {FC} from 'react';
import {addPost, deletePost, ProfileStateType, updateMessage} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/store";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../features/hooks/hooks";

export const MyPostsContainer: FC = () => {
    const dispatch = useAppDispatch()

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