export const convertParam = {
  toFriendType: (friend: string) => {
    if (friend === 'true') return 'follow';

    if (friend === 'false') return 'unfollow';

    return 'all';
  },

  toBoolean: (friend: string) => {
    if (friend === 'follow') return true;

    if (friend === 'unfollow') return false;

    return null;
  },
};
