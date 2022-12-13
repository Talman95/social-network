import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TitleContainer = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: '400',
  width: '110px',
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.body1,
    width: '140px',
    fontWeight: '500',
  },
}));

export const ValueContainer = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
  wordWrap: 'break-word',
  width: '200px',
  [theme.breakpoints.up('sm')]: {
    ...theme.typography.body1,
    fontWeight: '400',
  },
}));

export const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  wordWrap: 'break-word',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
  },
}));
