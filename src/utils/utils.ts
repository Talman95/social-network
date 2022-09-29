import {FriendUiType} from "../redux/usersReducer";

export const getCountPages = (totalCount: number, pageSize: number) => {
    return Math.ceil(totalCount / pageSize)
}

export class FriendTypeConverter {

    static toFriendType(friend: string) {
        let result: FriendUiType

        if (friend === 'true') {
            result = 'follow'
        } else if (friend === 'false') {
            result = 'unfollow'
        } else {
            result = 'all'
        }

        return result
    }

    static toBoolean(friend: string) {
        let result: boolean | null

        switch (friend) {
            case 'follow':
                result = true
                break
            case 'unfollow':
                result = false
                break
            default:
                result = null
                break
        }

        return result
    }
}