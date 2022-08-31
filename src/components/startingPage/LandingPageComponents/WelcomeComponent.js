import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'

const WelcomeComponent = ({ switchToForm }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'center' }}>
            <Box >
                <Typography className='gradient-subtitle'>
                    Kijiji rentals mapped out for you
                </Typography>
                <Typography variant='h2' sx={{ fontWeight: '800' }}>
                    Let's get searching!
                </Typography>
                <Typography variant='body2' sx={{ maxWidth: '450px' }}>
                    Tired of searching through an endlist list of rentals on Kijiji with no clue where they are located? Then this app is for you! See rental listings from Kijiji all throughout Canada, on a map!
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Button variant='contained' size='large' sx={{ borderRadius: '10px', padding: '12px 22px' }}
                    onClick={switchToForm}
                >
                    Get started
                </Button>
            </Box>
        </Box>
    )
}

export default WelcomeComponent