import React from 'react';
import {ActionTypes, ProfilePageType} from "./state";

const UPDATE_POST_MESSAGE = 'UPDATE_POST_MESSAGE';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';

const ProfileReducer = (state: ProfilePageType, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.postMessage,
                likesCount: 0
            };
            state.posts.unshift(newPost);
            state.postMessage = '';
            return state;
        }
        case UPDATE_POST_MESSAGE: {
            // @ts-ignore
            state.postMessage = action.postMessage;
            return state;
        }
        case DELETE_POST: {
            // @ts-ignore
            state.posts = state.posts.filter(p => p.id !== action.postId);
            return state;
        }
        default:
            return state;
    }
};

export default ProfileReducer;

export const addPostAC = () => ({type: 'ADD_POST'} as const);
export const updateMessageAC = (newMessage: string) => (
    {type: UPDATE_POST_MESSAGE, postMessage: newMessage} as const
);
export const deletePostAC = (postId: number) => (
    {type: DELETE_POST, postId: postId} as const
);