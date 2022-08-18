import React from 'react'
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import { Stack, Box, Typography, IconButton } from '@mui/material'

const Popup = ({ price, mainImage, url, bedrooms, datePosted }) => {
    return (
        <Box className="popup">
            <Stack>
                <Box sx={{ height: '130px', overflow: 'hidden', marginBottom: '.2rem' }}>
                    <img src={mainImage} alt="" />
                </Box>
                <Box sx={{ paddingLeft: '.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton aria-label="beds">
                            <LocalHotelOutlinedIcon />
                        </IconButton>
                        <Typography variant='caption' sx={{ transform: 'translateY(2px)', marginRight: '0.5rem' }}>{bedrooms}</Typography>
                    </Box>
                    <Typography variant='caption'>{datePosted}</Typography>
                </Box>

            </Stack>
        </Box>
    )
}

export default Popup