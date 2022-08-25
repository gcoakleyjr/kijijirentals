import React from 'react'
import { useContext } from 'react'
import { Box } from '@mui/system'
import { Paper, Button } from '@mui/material'

import WelcomeCompenent from './WelcomeComponent'
import LocationForm from './LocationForm'
import Filters from './Filters'
import { Context } from '../../Context'


const LandingPageForm = () => {
    const { formData, setFormData, welcomePage, locationForm, filters, switchToFilters, switchToForm } = useContext(Context)



    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center', position: 'relative' }}>
            {/* FLOATING CIRCLES*/}
            <Box>
                <img src='/images/blue-circle.svg' alt='' className='circle c-8' />
                <img src='/images/yellow-circle.svg' alt='' className='circle c-9' />
            </Box>
            <Paper elevation={0} sx={{
                height: '630px',
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
                <Box padding={3} sx={{ height: '85%', width: '100%' }}>
                    {/* TO KIJIJI BUTTON*/}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined'>Kijiji</Button>
                    </Box>

                    {/* START PAGE SLIDES*/}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {welcomePage && <WelcomeCompenent switchToForm={switchToForm} />}
                        {locationForm && <LocationForm switchToFilters={switchToFilters} formData={formData} setFormData={setFormData} />}
                        {filters && <Filters formData={formData} setFormData={setFormData} />}
                    </Box>

                </Box>

                {/* BOTTOM GREY BAND*/}
                <Box sx={{ height: '16%', background: 'rgba(0,0,0, .05)' }}>
                </Box>

            </Paper>

        </Box>
    )
}

export default LandingPageForm