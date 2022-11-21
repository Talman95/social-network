import React, { FC } from 'react';

import { PostType } from '../../../store/profileReducer';
import { ProfileType } from '../../../types/ProfileType';

import { Post } from './Post/Post';
import { WriteField } from './WriteField/WriteField';

type MyPostsPropsType = {
  posts: PostType[];
  addPost: () => void;
  deletePost: (postId: number) => void;
  postMessage: string;
  updateMessage: (newMessage: string) => void;
  profile: ProfileType | null;
};

export const MyPosts: FC<MyPostsPropsType> = ({
  posts,
  addPost,
  deletePost,
  postMessage,
  updateMessage,
  profile,
}) => {
  const postsComponents = posts.map(({ id, message, picture }) => (
    <Post
      key={id}
      id={id}
      message={message}
      picture={picture}
      deletePost={deletePost}
      profile={profile}
    />
  ));

  return (
    <>
      <WriteField
        postMessage={postMessage}
        updateMessage={updateMessage}
        addPost={addPost}
        profile={profile}
      />
      {postsComponents}
    </>
  );
};
