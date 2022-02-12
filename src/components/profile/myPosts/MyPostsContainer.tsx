import React, {FC} from 'react';
import {addPostAC, deletePostAC, updateMessageAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {ReduxStoreType} from "../../../redux/store";

type PropsType = {
    store: ReduxStoreType
}

export const MyPostsContainer: FC<PropsType> = (props) => {
    let state = props.store.getState();

    const deletePost = (postID: number) => props.store.dispatch(deletePostAC(postID))
    const updateMessage = (newMessage: string) => props.store.dispatch(updateMessageAC(newMessage))
    const addPost = () => props.store.dispatch(addPostAC())

    return (
        <div>
            <MyPosts
                posts={state.profile.posts}
                deletePost={deletePost}
                postMessage={state.profile.postMessage}
                updateMessage={updateMessage}
                addPost={addPost}
            />
        </div>
    );
};