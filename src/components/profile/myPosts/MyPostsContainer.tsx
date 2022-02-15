import React from 'react';
import {addPostAC, deletePostAC, PostType, updateMessageAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from 'redux';

type MapStatePropsType = {
    posts: PostType[]
    postMessage: string
}
type MapDispatchPropsType = {
    deletePost: (postId: number) => void
    updateMessage: (newMessage: string) => void
    addPost: () => void
}

export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profile.posts,
        postMessage: state.profile.postMessage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        deletePost: (postID: number) => {
            dispatch(deletePostAC(postID))
        },
        updateMessage: (newMessage: string) => {
            dispatch(updateMessageAC(newMessage))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)