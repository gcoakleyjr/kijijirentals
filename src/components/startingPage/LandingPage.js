import React, { useContext } from 'react'
import { Context } from '../Context'
import Div100vh from 'react-div-100vh';

import { Container, Box } from '@mui/system'
import LandingPageForm from './LandingPageComponents/LandingPageForm'

const LandingPage = () => {
    const { mediaQuerySm } = useContext(Context)
    return (
        <Div100vh id='fullheight'>
            {/* HOME PAGE BACKGROUND CIRCLES*/}
            <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'absolute' }}>
                <img src='/images/purple-circle.svg' alt='' className='circle c-1' />
                <img src='/images/yellow-circle.svg' alt='' className='circle c-2' />
                <img src='/images/green-circle.svg' alt='' className='circle c-3' />
                <img src='/images/blue-circle.svg' alt='' className='circle c-4' />
                <img src='/images/yellow-circle.svg' alt='' className='circle c-5' />
                <img src='/images/green-circle.svg' alt='' className='circle c-6' />
                {mediaQuerySm && <img src='/images/purple-circle.svg' alt='' className='circle c-7' />}
            </Box>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
                <LandingPageForm />
            </Container>
        </Div100vh >
    )
}

export default LandingPage