import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { setAppErrorMessage } from '../../../store/actions/appActions';
import { AppStateType } from '../../../store/store';
import { ReturnComponentType } from '../../../types/ReturnComponentType';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackbar = (): ReturnComponentType => {
  const errorMessage = useSelector<AppStateType, string | null>(
    state => state.app.errorMessage,
  );
  const dispatch = useDispatch();

  const isOpen = errorMessage !== null;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorMessage(null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
