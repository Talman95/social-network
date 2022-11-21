import React, { FC } from 'react';

import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileDetailsContainer } from './ProfileDetails/ProfileDetailsContainer';

type ProfilePropsType = {
  userId: string | undefined;
};

export const Profile: FC<ProfilePropsType> = ({ userId }) => (
  <>
    <ProfileDetailsContainer userId={userId} />
    {!userId && <MyPostsContainer />}
  </>
);
