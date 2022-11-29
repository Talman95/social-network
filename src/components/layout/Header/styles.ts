import { Box, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const UserContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const NameContainer = styled(Typography)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  variant: 'body1',
  component: 'span',
  margin: '-15px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));
