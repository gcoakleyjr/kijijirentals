import React from 'react'
import { Box } from '@mui/system';

const Marker = ({ onClick, children, feature }) => {
    // const _onClick = () => {
    //     onClick(feature);
    // };

    return (
        <Box sx={{ padding: '0 10px', paddingBottom: '20px' }} className="marker">
            {children}
        </Box>
    );
}

export default Marker