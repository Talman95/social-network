import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  addPost,
  deletePost,
  ProfileStateType,
  updateMessage,
} from '../../../store/profileReducer';
import { AppStateType } from '../../../store/store';

import { MyPosts } from './MyPosts';

export const MyPostsContainer: FC = () => {
  const { posts, postMessage, profile } = useSelector<AppStateType, ProfileStateType>(
    state => state.profile,
  );

  const dispatch = useAppDispatch();

  const deletePostHandler = (postId: number) => {
    dispatch(deletePost(postId));
  };
  const updateMessageHandler = (newMessage: string) => {
    dispatch(updateMessage(newMessage));
  };
  const addPostHandler = () => {
    dispatch(addPost());
  };

  return (
    <MyPosts
      posts={posts}
      addPost={addPostHandler}
      deletePost={deletePostHandler}
      postMessage={postMessage}
      updateMessage={updateMessageHandler}
      profile={profile}
    />
  );
};
