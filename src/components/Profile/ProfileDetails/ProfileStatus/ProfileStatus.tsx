import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {updateProfileStatus} from "../../../../store/profileReducer";
import {useAppDispatch} from "../../../../features/hooks/hooks";

type StatusPropsType = {
    status: string
}

export const ProfileStatus: FC<StatusPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const dispatch = useAppDispatch()

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateProfileStatus(status))
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {editMode
                ?
                <div>
                    <input
                        value={status}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        onChange={onChangeStatus}
                    />
                </div>
                :
                <div onClick={activateEditMode}>
                    <p>{status}</p>
                </div>
            }
        </>
    );
};