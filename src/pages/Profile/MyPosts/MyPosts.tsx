import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { selectPosts } from '../../../store/selectors/profileSelectors';

import { Post } from './Post/Post';
import { WriteField } from './WriteField/WriteField';

export const MyPosts: FC = () => {
  const posts = useSelector(selectPosts);

  return (
    <>
      <WriteField />

      {posts.map(({ id, message }) => (
        <Post key={id} id={id} message={message} />
      ))}
    </>
  );
};
