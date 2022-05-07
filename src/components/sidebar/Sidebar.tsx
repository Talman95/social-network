import React from 'react';
import Box from '@mui/material/Box';

export const Sidebar: React.FC = () => {
    return (
        <Box
            flex={2}
            p={2}
            bgcolor={'green'}
            sx={{display: {xs: 'none', sm: 'block'}}}
        >
            Sidebar
        </Box>
    );
};