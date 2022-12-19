import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';

import { snackbarType } from '../../../enums/snackbarType';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAppMessage } from '../../../store/actions/appActions';
import {
  selectAppMessage,
  selectAppTypeMessage,
} from '../../../store/selectors/appSelectors';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const message = useSelector(selectAppMessage);
  const appTypeMessage = useSelector(selectAppTypeMessage);

  const isOpen = message !== null;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppMessage(snackbarType.ERROR, null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={appTypeMessage}>
        {message}
      </Alert>
    </Snackbar>
  );
};
