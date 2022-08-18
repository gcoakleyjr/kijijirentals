import React from 'react'

import { Container, Box } from '@mui/system'
import LandingPageForm from './LandingPageComponents/LandingPageForm'

const LandingPage = () => {
    return (
        <Box component="main" sx={{ background: 'white', width: '100vw', height: '100vh' }}>
            <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'absolute' }}>
                <img src='/images/purple-circle.svg' alt='' className='circle c-1' />
                <img src='/images/yellow-circle.svg' alt='' className='circle c-2' />
                <img src='/images/green-circle.svg' alt='' className='circle c-3' />
                <img src='/images/blue-circle.svg' alt='' className='circle c-4' />
                <img src='/images/yellow-circle.svg' alt='' className='circle c-5' />
                <img src='/images/green-circle.svg' alt='' className='circle c-6' />
                <img src='/images/purple-circle.svg' alt='' className='circle c-7' />
            </Box>
            <Container maxWidth="lg">
                <LandingPageForm />
            </Container>
        </Box >
    )
}

export default LandingPage