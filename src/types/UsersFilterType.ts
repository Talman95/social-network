import { showUsers } from '../enums/showUsers';

export type UsersFilterType = {
  searchName: string;
  userFriends: showUsers;
};
