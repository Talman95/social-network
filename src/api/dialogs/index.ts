import { DialogsType } from '../../types/DialogType';
import { instance } from '../config';

export const dialogsAPI = {
  getAllDialogs: async () => {
    const res = await instance.get<DialogsType[]>('/dialogs');
    return res.data;
  },

  startDialogWithUser(userId: number) {
    return instance.put(`/dialogs/${userId}`);
  },

  getMessagesOfUser(userId: number) {
    return instance.get(`/dialogs/${userId}/messages`);
  },

  sendMessage(userId: number, message: string) {
    return instance.post(`/dialogs/${userId}/messages`, { message });
  },
};
