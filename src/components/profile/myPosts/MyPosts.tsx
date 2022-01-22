import React from 'react';
import cl from "./MyPosts.module.css";
import {Post} from "./post/Post";
import {PostType} from "../../../redux/state";
import {WriteField} from "./writeField/WriteField";

type PropsType = {
    posts: PostType[]
    addPost: (message: string) => void
}

export const MyPosts: React.FC<PropsType> = (props) => {

    const mapToPosts = props.posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}
    />)

    return (
        <div className={cl.my_posts}>
            <WriteField addPost={props.addPost}/>
            {mapToPosts}
        </div>
    );
};