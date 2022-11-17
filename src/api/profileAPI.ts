import {instance} from "./api";
import {PhotosType, ProfileType, ProfileUpdateType, ResponseType} from "./types";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>('profile/status', {status})
    },
    updateProfile(profile: ProfileUpdateType) {
        return instance.put<ResponseType<{}>>('profile', {...profile})
    },
    uploadPhoto(newFile: File) {
        const formData = new FormData()
        formData.append('image', newFile);
        return instance.put<ResponseType<{ photos: PhotosType }>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
}