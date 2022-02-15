import React, {FC} from 'react';
import cl from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {WriteField} from "./WriteField/WriteField";
import {MyPostsPropsType} from "./MyPostsContainer";

export const MyPosts: FC<MyPostsPropsType> = (props) => {

    const postsComponents = props.posts.map(p => <Post key={p.id}
                                                       id={p.id}
                                                       message={p.message}
                                                       likesCount={p.likesCount}
                                                       deletePost={props.deletePost}
    />)

    return (
        <div className={cl.my_posts}>
            <WriteField
                postMessage={props.postMessage}
                updateMessage={props.updateMessage}
                addPost={props.addPost}
            />
            {postsComponents}
        </div>
    );
};