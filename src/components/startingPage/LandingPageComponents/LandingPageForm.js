import React, { useContext } from 'react'
import { Context } from '../../Context'

import { Box } from '@mui/system'
import { Paper } from '@mui/material'


import FormSlides from '../../components/FormSlides'


const LandingPageForm = () => {
    const { mediaQueryMd, mediaQuerySm } = useContext(Context)

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', position: 'relative' }}>
            {/* FLOATING CIRCLES*/}
            {
                mediaQueryMd &&
                <Box>
                    <img src='/images/blue-circle.svg' alt='' className='circle c-8' />
                    <img src='/images/yellow-circle.svg' alt='' className='circle c-9' />
                </Box>
            }
            <Paper elevation={0} sx={{
                height: mediaQuerySm ? '630px' : '600px',
                width: '90%',
                borderRadius: '24px',
                border: "3px solid rgba(200, 200, 200, .3)",
                background: 'linear-gradient(120deg, rgba(247,248,250,.5) 0%, rgba(229,232,240,.5) 100%)',
                backdropFilter: 'blur(23px)',
                boxShadow: '0 50px 50px rgba(0,0,0, .1)',
                zIndex: '3',
                position: 'relative',
                overflow: 'hidden'
            }}>

                <FormSlides />

            </Paper>

        </Box>
    )
}

export default LandingPageForm