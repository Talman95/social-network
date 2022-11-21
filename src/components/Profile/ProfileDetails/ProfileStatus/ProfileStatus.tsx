import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { updateProfileStatus } from '../../../../store/middlewares/profile/thunks';

type StatusPropsType = {
  status: string;
};

export const ProfileStatus: FC<StatusPropsType> = ({ status }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileStatus, setProfileStatus] = useState<string>(status);

  useEffect(() => {
    setProfileStatus(status);
  }, [status]);

  const dispatch = useAppDispatch();

  const activateEditMode = (): void => {
    setEditMode(true);
  };
  const deactivateEditMode = (): void => {
    setEditMode(false);
    dispatch(updateProfileStatus(status));
  };
  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>): void => {
    setProfileStatus(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={profileStatus}
            onBlur={deactivateEditMode}
            onChange={onChangeStatus}
          />
        </div>
      ) : (
        <div role="button" onClick={activateEditMode} onKeyPress={undefined} tabIndex={0}>
          <p>{profileStatus}</p>
        </div>
      )}
    </div>
  );
};
