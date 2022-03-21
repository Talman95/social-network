import React, {FC} from 'react';
import cl from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {WriteField} from "./WriteField/WriteField";
import {PostType, ProfileType} from "../../../redux/profileReducer";

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
                                                       likesCount={p.likesCount}
                                                       deletePost={props.deletePost}
                                                       profile={props.profile}
    />)

    return (
        <div className={cl.my_posts}>
            <WriteField
                postMessage={props.postMessage}
                updateMessage={props.updateMessage}
                addPost={props.addPost}
                profile={props.profile}
            />
            {postsComponents}
        </div>
    );
};