import {instance} from "./api";
import {DialogsType} from "./types";

export const dialogsAPI = {
    getAllDialogs() {
        return instance.get<DialogsType[]>('dialogs')
    },
    startDialogWithUser(userId: number) {
        return instance.put(`dialogs/${userId}`)
    },
    getMessagesOfUser(userId: number) {
        return instance.get(`dialogs/${userId}/messages`)
    },
    sendMessage(userId: number, message: string) {
        return instance.post(`dialogs/${userId}/messages`, {message})
    }
}