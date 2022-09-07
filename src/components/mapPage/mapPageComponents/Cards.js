import React, { useContext } from "react"
import RentalCard from "./RentalCard"
import { Context } from "../../Context"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack } from '@mui/material';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

function Cards({ isActive, setIsActive, flyToStore, createPopUp, data }) {

    const theme = useTheme();
    const { handleRentalClick, mediaQueryMd, mediaQuerySm, sideBarRentalListOpen, handleRentalListDrawerClose } = useContext(Context)
    const drawerWidth = mediaQueryMd ? 450 : mediaQuerySm ? '50%' : '100%';

    const cards = data.features ? data.features.map((val, i) => {
        return (
            < RentalCard data={val} key={i} setIsActive={setIsActive} isActive={isActive} id={i} flyToStore={flyToStore} createPopUp={createPopUp} handleRentalClick={handleRentalClick} mediaQueryMd={mediaQueryMd} handleRentalListDrawerClose={handleRentalListDrawerClose} />
        )
    }) : ""

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    position: 'relative',
                    flexShrink: 0,
                    zIndex: '300',
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#fff',
                        zIndex: '300'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={sideBarRentalListOpen}
            >
                <DrawerHeader>
                    <Box sx={{ marginLeft: '.5rem' }}>
                        <img src='./images/logo-01.svg' alt='' className='logo-sm' />
                    </Box>


                    {!mediaQueryMd &&
                        <IconButton onClick={handleRentalListDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>}
                </DrawerHeader>
                <Divider />

                <Box sx={{ height: "100%", width: '100%', position: 'relative' }}>
                    <Stack spacing={1} sx={{ alignItems: 'center', marginTop: '.5rem', marginBottom: '5.5rem' }}>
                        {cards}
                    </Stack>
                </Box>
            </Drawer>
        </Box>

    )
}

export default React.memo(Cards)