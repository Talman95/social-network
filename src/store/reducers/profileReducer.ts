import { ProfileType } from '../../types/ProfileType';
import {
  addPost,
  deletePost,
  setFriendship,
  setProfileLoad,
  setProfileStatus,
  setUserProfile,
  updateMessage,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../actions/profileActions';
import { ActionsType } from '../actions/types/profileTypes';

const initialState = {
  profile: null as ProfileType | null,
  posts: [
    { id: 4, message: 'Hi, how are you guys?', picture: '' },
    {
      id: 3,
      message: 'Yo yo yo!!!',
      picture:
        'https://www.freecodecamp.org/news/content/images/size/w2000/2022/03/photo-1619410283995-43d9134e7656.jpeg',
    },
    {
      id: 2,
      message: 'My hometown',
      picture:
        'https://img-cdn.tinkoffjournal.ru/i/n7_9ShaavMSV9O0eeTbqy1Z0udl7C-EcxHVE1uc-CXU/w:1200/aHR0cHM6Ly9pbWct/Y2RuLnRpbmtvZmZq/b3VybmFsLnJ1Ly0v/bWFpbl9fX19fc2h1/dHRlcnN0b2NrXzE0/OTk0MDEwMDEuaDBq/eXdxaWxtNDBoLmpw/Zw',
    },
    {
      id: 1,
      message:
        "It's my first post! Hello everyone! Glad to see you here. Don't forget about the likes) Good luck!",
      picture: 'https://www.4vsar.ru/i/news/xxl/283806.jpg',
    },
  ] as PostType[],
  postMessage: '',
  status: '',
  isFriend: false,
  isLoad: true,
};

export type PostType = {
  id: number;
  message: string;
  picture: string;
};
export type ProfileStateType = typeof initialState;
export type UploadUserPhotoSuccessType = ReturnType<typeof uploadUserPhotoSuccess>;
export type UpdateProfileSuccessType = ReturnType<typeof updateProfileSuccess>;
export type UpdateProfileModal = {
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
  };
  aboutMe: string;
};
export type ProfileActionsType =
  | ReturnType<typeof addPost>
  | ReturnType<typeof updateMessage>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setProfileStatus>
  | ReturnType<typeof setFriendship>
  | ReturnType<typeof setProfileLoad>
  | UploadUserPhotoSuccessType
  | UpdateProfileSuccessType;

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType,
): ProfileStateType => {
  switch (action.type) {
    case ActionsType.ADD_POST: {
      const newPost = {
        id: new Date().getTime(),
        message: state.postMessage,
        picture: '',
      };

      return { ...state, posts: [newPost, ...state.posts] };
    }
    case ActionsType.UPDATE_POST_MESSAGE: {
      return { ...state, postMessage: action.newMessage };
    }
    case ActionsType.DELETE_POST: {
      return { ...state, posts: [...state.posts.filter(p => p.id !== action.postId)] };
    }
    case ActionsType.SET_USER_PROFILE:
    case ActionsType.SET_PROFILE_STATUS:
    case ActionsType.SET_FRIENDSHIP:
    case ActionsType.SET_PROFILE_LOAD:
      return {
        ...state,
        ...action.payload,
      };
    case ActionsType.UPLOAD_USER_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case ActionsType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: state.profile
          ? ({ ...state.profile, ...action.payload.updatedProfile } as ProfileType)
          : state.profile,
      };
    default:
      return state;
  }
};
