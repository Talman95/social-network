import React, {FC} from 'react';
import {Post} from "./Post/Post";
import {WriteField} from "./WriteField/WriteField";
import {PostType} from "../../../store/profileReducer";
import {ProfileType} from "../../../types/ProfileType";

type MyPostsPropsType = {
    posts: PostType[]
    addPost: () => void
    deletePost: (postId: number) => void
    postMessage: string
    updateMessage: (newMessage: string) => void
    profile: ProfileType | null
}

export const MyPosts: FC<MyPostsPropsType> = (props) => {

    const postsComponents = props.posts.map(p => <Post key={p.id}
                                                       id={p.id}
                                                       message={p.message}
                                                       picture={p.picture}
                                                       deletePost={props.deletePost}
                                                       profile={props.profile}
    />)

    return (
        <>
            <WriteField
                postMessage={props.postMessage}
                updateMessage={props.updateMessage}
                addPost={props.addPost}
                profile={props.profile}
            />
            {postsComponents}
        </>
    );
};