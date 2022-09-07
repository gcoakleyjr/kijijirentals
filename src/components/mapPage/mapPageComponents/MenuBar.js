import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LaunchIcon from '@mui/icons-material/Launch';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Paper } from '@mui/material';

export default function MenuBar({ handleOpen, mediaQueryMd, handleRentalListToggle }) {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: 'absolute', bottom: '33px', left: '50%', right: 0, width: '300px', transform: 'translateX(-50%)', backgroundColor: 'cadetblue' }} elevation={3}>
            <Box sx={{ width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} href='/' />
                    {!mediaQueryMd && <BottomNavigationAction label="List" icon={<MenuOpenIcon />} onClick={handleRentalListToggle} />}
                    <BottomNavigationAction label="Filters" icon={<FilterListIcon />} onClick={handleOpen} />
                    <BottomNavigationAction label="Kijiji" icon={<LaunchIcon />} href='https://www.kijiji.ca/' target="_blank" rel="noopener" />
                </BottomNavigation>
            </Box>
        </Paper>
    );
}