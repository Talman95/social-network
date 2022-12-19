import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { updateProfileStatus } from '../../../../store/middlewares/profile';

type PropsType = {
  status: string;
};

export const ProfileStatus: FC<PropsType> = ({ status }) => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [profileStatus, setProfileStatus] = useState(status);

  useEffect(() => {
    setProfileStatus(status);
  }, [status]);

  const onEditModeClick = (): void => {
    setEditMode(true);
  };

  const onEditModeBlur = (): void => {
    setEditMode(false);
    dispatch(updateProfileStatus(profileStatus));
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProfileStatus(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={profileStatus}
          onBlur={onEditModeBlur}
          onChange={onStatusChange}
        />
      ) : (
        <div role="button" onClick={onEditModeClick} onKeyPress={undefined} tabIndex={0}>
          <p>{profileStatus}</p>
        </div>
      )}
    </div>
  );
};
