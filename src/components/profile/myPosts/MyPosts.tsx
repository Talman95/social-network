import React from 'react';
import cl from "../Profile.module.css";
import user from "../../../assets/images/userLogo.png";
import {MyButton} from "../../UI/button/MyButton";
import {Post} from "./post/Post";
import {PostType} from "../../../redux/state";

type PropsType = {
    posts: PostType[]
}

export const MyPosts: React.FC<PropsType> = (props) => {

    const mapToPosts = props.posts.map(p => <Post key={p.id}
                                                  id={p.id}
                                                  message={p.message}
                                                  likesCount={p.likesCount}/>)

    return (
        <>
            <div className={cl.write_post_container}>
                <div className={cl.user_profile}>
                    <img src={user} alt="user"/>
                    <div>
                        <p>Roman Talmanof</p>
                        <span className={cl.status}>Set the status</span>
                    </div>
                </div>
                <div className={cl.post_input_container}>
                    <textarea rows={3} placeholder={"How you doin?"}></textarea>
                    <div className={cl.add_post_button}>
                        <MyButton>Add a post</MyButton>
                    </div>
                </div>
            </div>
            {mapToPosts}
        </>
    );
};