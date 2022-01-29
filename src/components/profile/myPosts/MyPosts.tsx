import React from 'react';
import cl from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/state";
import {WriteField} from "./WriteField/WriteField";

type PropsType = {
    posts: PostType[]
    dispatch: any
    postMessage: string
}

export const MyPosts: React.FC<PropsType> = (props) => {

    const mapToPosts = props.posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}
    />)

    return (
        <div className={cl.my_posts}>
            <WriteField postMessage={props.postMessage}
                        dispatch={props.dispatch}
            />
            {mapToPosts}
        </div>
    );
};