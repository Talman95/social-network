import React from 'react';
import cl from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {WriteField} from "./WriteField/WriteField";
import {PostType} from "../../../redux/profileReducer";

type PropsType = {
    posts: PostType[]
    deletePost: (postID: number) => void
    postMessage: string
    updateMessage: (newMessage: string) => void
    addPost: () => void
}

export const MyPosts: React.FC<PropsType> = (props) => {

    const mapToPosts = props.posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}
                                                  deletePost={props.deletePost}
    />)

    return (
        <div className={cl.my_posts}>
            <WriteField postMessage={props.postMessage}
                        updateMessage={props.updateMessage}
                        addPost={props.addPost}
            />
            {mapToPosts}
        </div>
    );
};