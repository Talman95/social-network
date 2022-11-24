import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const IconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  maxWidth: '296px',
  height: '90px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '100%',
    height: '106px',
    padding: '0 15px',
  },
}));

export const UserNameContainer = styled(Typography)({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordWrap: 'break-word',
});
