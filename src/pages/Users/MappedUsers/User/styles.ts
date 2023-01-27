import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 0,
  height: '90px',
  [theme.breakpoints.up('sm')]: {
    width: 'inherit',
    height: '106px',
    padding: '0 15px',
    justifyContent: 'space-between',
  },
}));

export const UserNameContainer = styled(Box)(({ theme }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordWrap: 'break-word',
  width: '90px',
  [theme.breakpoints.up('sm')]: {
    width: '90%',
  },
}));

export const StatusContainer = styled('div')(({ theme }) => ({
  width: '90px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.up('sm')]: {
    width: '90%',
  },
}));
