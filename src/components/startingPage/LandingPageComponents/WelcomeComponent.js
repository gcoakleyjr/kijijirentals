import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'

const WelcomeComponent = ({ switchToForm }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: "100%", justifyContent: 'space-between', paddingBottom: '40px' }}>


            <Box>
                <Typography>
                    Kijiji rentals mapped out for you
                </Typography>
                <Typography variant='h3' sx={{ fontWeight: '800' }}>
                    Let's get searching!
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' size='large' sx={{ borderRadius: '10px' }}
                    onClick={switchToForm}
                >
                    Get started
                </Button>
            </Box>
        </Box>
    )
}

export default WelcomeComponent