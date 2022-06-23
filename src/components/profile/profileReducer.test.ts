import {
    addPost,
    deletePost,
    PostType,
    profileReducer,
    ProfileStateType, setFriendship, setProfileStatus, setUserProfile,
    updateMessage
} from "../../redux/profileReducer";

let startState: ProfileStateType = {
    profile: null,
    posts: [] as PostType[],
    postMessage: '',
    profileStatus: '',
    isFriend: false,
}

beforeEach(() => {
    startState = {
        profile: null,
        posts: [
            {id: 4, message: 'Hi, how are you guys?', picture: '4'},
            {id: 3, message: 'Yo yo yo!!!', picture: '3'},
            {id: 2, message: 'My hometown', picture: '2'},
            {id: 1, message: 'It\'s my first post! Hello everyone!', picture: '1'},
        ],
        postMessage: '',
        profileStatus: '',
        isFriend: false,
    }
})

test("correct post should be added", () => {

    let endState = profileReducer(startState, addPost())

    expect(endState.posts.length).toBe(5)
    expect(endState.posts[0].id).toBeDefined()
    expect(endState.posts[0].message).toBe(startState.postMessage)
    expect(endState.posts[0].picture).toBe('')
})

test("correct message should be updated", () => {
    let endState = profileReducer(startState, updateMessage('Some user information'))

    expect(endState.postMessage).toBe('Some user information')
})

test("correct post should be removed", () => {
    let endState = profileReducer(startState, deletePost(2))

    expect(endState.posts.length).toBe(3)
    expect(endState.posts).toEqual([
        {id: 4, message: 'Hi, how are you guys?', picture: '4'},
        {id: 3, message: 'Yo yo yo!!!', picture: '3'},
        {id: 1, message: 'It\'s my first post! Hello everyone!', picture: '1'},
    ])
})

test("correct profile should be setted", () => {
    const profile = {
        aboutMe: 'description',
        contacts: {
            facebook: 'facebook',
            website: 'website',
            vk: 'vk',
            twitter: 'twitter',
            instagram: 'instagram',
            youtube: 'youtube',
            github: 'github',
            mainLink: 'mainLink',
        },
        lookingForAJob: false,
        lookingForAJobDescription: 'looking for a job',
        fullName: 'Ivan Ivanov',
        userId: 123456,
        photos: {
            small: 'small',
            large: 'large',
        },
    }

    let endState = profileReducer(startState, setUserProfile(profile))

    expect(endState.profile).toBeDefined()
    expect(endState.profile).toEqual(profile)
})

test("status should be set", () => {
    let endState = profileReducer(startState, setProfileStatus('React Redux'))

    expect(endState.profileStatus).toBe('React Redux')
})

test("current user should become friend", () => {
    let endState = profileReducer(startState, setFriendship(true))

    expect(endState.isFriend).toBe(true)
})