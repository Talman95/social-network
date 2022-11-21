export type DialogsType = {
  hasNewMessages: boolean;
  id: number;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: {
    large: string;
    small: string;
  };
  userName: string;
};
