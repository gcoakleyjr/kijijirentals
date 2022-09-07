import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { SliderComponent } from './Slider';


import { Context } from '../../Context';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const { sideBarRentalOpen, handleRentalDrawerClose, rentalData, loadingRental, mediaQueryMd, mediaQuerySm } = React.useContext(Context)

    const drawerWidth = mediaQueryMd ? 450 : mediaQuerySm ? '50%' : '100%';

    return (
        <Box sx={{ display: 'flex' }}>


            <Drawer
                sx={{
                    width: drawerWidth,
                    position: 'absolute',
                    flexShrink: 0,
                    zIndex: '500',
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f8f8f8',
                        zIndex: '500',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={sideBarRentalOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleRentalDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <Box sx={{ height: "100%", width: '100%', position: 'relative' }}>
                    {loadingRental ?
                        <Box
                            sx={{
                                color: '#fff',
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                background: 'rgba(0, 0, 0, .3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Box>
                        :
                        <Stack>
                            {/* RENTAL IMAGE SLIDES */}
                            <SliderComponent images={rentalData.images} />

                            {/* RENTAL DESCRIPTION */}
                            <Stack p={2} spacing={2} sx={{ transform: 'translateY(-35px)' }}>
                                <Paper
                                    className='rentalDetailCard'
                                    elevation={10}
                                    sx={{
                                        padding: '1rem',
                                    }}>

                                    <Stack spacing={1}>
                                        <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    color: 'cadetblue',
                                                    transition: '.3s',
                                                    cursor: 'pointer',
                                                    display: 'inline-block',
                                                    fontWeight: '700',
                                                }}>
                                                {rentalData.price}
                                            </Typography>

                                            <IconButton aria-label="to-ad" className='to-kijiji' sx={{ transform: 'translateY(-7px)' }}>
                                                <Link href={rentalData.url} target="_blank" rel="noopener"><LaunchIcon /></Link>
                                            </IconButton>
                                        </Stack>


                                        <Typography variant='caption text'>{rentalData.address}</Typography>

                                        <Stack direction="row" spacing={2} sx={{ marginBottom: '1rem !important' }}>
                                            {rentalData.generalInfo.map((val, i) => {
                                                if (i > 2) return ''
                                                return (<Chip key={i} label={val} />)
                                            })}
                                        </Stack>

                                        <Typography variant='caption text' sx={{ color: 'rgb(101 101 101)', fontSize: '.85rem' }}>Posted {rentalData.time}</Typography>

                                    </Stack>

                                </Paper>
                                <Paper
                                    className='rentalDetailCard'
                                    elevation={10}
                                    sx={{
                                        padding: '1rem',
                                    }}>
                                    <Stack spacing={1}>

                                        <Typography variant='h6'>Overview</Typography>
                                        <Box>
                                            <Typography variant='body1'>Utilities Included</Typography>
                                            <Stack direction="row" spacing={2}>
                                                {
                                                    ['Hydro', 'Heat', 'Water'].some(val => rentalData.utilities.includes(val))
                                                        ?
                                                        rentalData.utilities.map((val, i) => {
                                                            if (val === 'Water' || val === 'Hydro' || val === 'Heat') return (<Chip key={i} label={val} sx={{ marginBottom: '.5rem', flexWrap: 'wrap' }} />)
                                                            else return ''
                                                        })
                                                        :
                                                        (<Chip label='None' />)
                                                }
                                            </Stack>
                                        </Box>

                                    </Stack>
                                </Paper>

                                <Paper
                                    className='rentalDetailCard'
                                    elevation={10}
                                    sx={{
                                        padding: '1rem',
                                    }}>
                                    <Stack spacing={1}>
                                        <Typography variant='h6'>Description</Typography>
                                        <Stack>
                                            {
                                                rentalData.description.length === 0
                                                    ?
                                                    rentalData.description2
                                                    :
                                                    rentalData.description.map((val, i) => {
                                                        if (!val) return ''
                                                        return (<Typography variant='body2' key={i}>{val}<br></br><br></br></Typography>)
                                                    })
                                            }
                                        </Stack>
                                    </Stack>
                                </Paper>

                            </Stack>
                        </Stack>
                    }
                </Box>
            </Drawer>
        </Box>
    );
}
