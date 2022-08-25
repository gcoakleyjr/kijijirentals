import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Paper } from '@mui/material';

export default function MenuBar({ handleOpen }) {
    const [value, setValue] = React.useState(0);


    return (
        <Paper sx={{ position: 'absolute', bottom: '93px', left: '50%', right: 0, width: '300px', transform: 'translateX(-50%)', backgroundColor: 'cadetblue' }} elevation={3}>
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Previous" icon={<KeyboardDoubleArrowLeftIcon />} />
                    <BottomNavigationAction label="Filters" icon={<FilterListIcon />} onClick={handleOpen} />
                    <BottomNavigationAction label="Next" icon={<KeyboardDoubleArrowRightIcon />} />
                </BottomNavigation>
            </Box>
        </Paper>
    );
}