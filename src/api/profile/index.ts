import { PhotosType } from '../../types/PhotosType';
import { ProfileType } from '../../types/ProfileType';
import { ResponseType } from '../../types/ResponseType';
import { instance } from '../config';

import { ProfileUpdateType } from './types';

export const profileAPI = {
  getProfile: async (userId: number) => {
    const res = await instance.get<ProfileType>(`/profile/${userId}`);

    return res.data;
  },

  getStatus: async (userId: number) => {
    const res = await instance.get<string>(`/profile/status/${userId}`);

    return res.data;
  },

  updateStatus: async (status: string) => {
    const res = await instance.put<ResponseType<{}>>('/profile/status', { status });

    return res.data;
  },

  updateProfile: async (profile: ProfileUpdateType) => {
    const res = await instance.put<ResponseType<{}>>('/profile', { ...profile });

    return res.data;
  },

  uploadPhoto: async (newFile: File) => {
    const formData = new FormData();

    formData.append('image', newFile);

    const res = await instance.put<ResponseType<{ photos: PhotosType }>>(
      '/profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data;
  },
};
