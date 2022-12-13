import { showUsers } from '../enums/showUsers';

export const convertParam = {
  toFriendType: (friend: string) => {
    if (friend === 'true') return showUsers.FOLLOW;

    if (friend === 'false') return showUsers.UNFOLLOW;

    return showUsers.ALL;
  },

  toBoolean: (friend: string) => {
    if (friend === showUsers.FOLLOW) return true;

    if (friend === showUsers.UNFOLLOW) return false;

    return null;
  },
};
