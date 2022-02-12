import React, {FC} from 'react';
import {addPostAC, deletePostAC, updateMessageAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {ReduxStoreType} from "../../../redux/store";

type PropsType = {
    store: ReduxStoreType
}

export const MyPostsContainer: FC<PropsType> = (props) => {
    let state = props.store.getState();

    const onDeletePost = (postID: number) => props.store.dispatch(deletePostAC(postID))
    const onUpdateMessage = (newMessage: string) => props.store.dispatch(updateMessageAC(newMessage))
    const onAddPost = () => props.store.dispatch(addPostAC())

    return (
        <div>
            <MyPosts
                posts={state.profile.posts}
                deletePost={onDeletePost}
                postMessage={state.profile.postMessage}
                updateMessage={onUpdateMessage}
                addPost={onAddPost}
            />
        </div>
    );
};