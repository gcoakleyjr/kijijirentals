import React from 'react'
import { useContext } from 'react'

import WelcomeComponent from '../../startingPage/LandingPageComponents/WelcomeComponent'
import LocationForm from '../../startingPage/LandingPageComponents/LocationForm'
import Filters from '../../startingPage/LandingPageComponents/Filters'
import { Context } from '../../Context'
import { Box, Paper, Button, Stack, Typography } from '@mui/material'

const FiltersModal = () => {
    const { formData, setFormData, welcomePage, locationForm, filters, switchToFilters, switchToForm, switchBackToForm } = useContext(Context)

    return (
        <Paper sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            background: 'linear-gradient(120deg, rgba(247,248,250,1) 0%, rgba(229,232,240,1) 100%)',
            border: "3px solid rgba(200, 200, 200, .3)",
            borderRadius: '24px',
            boxShadow: 24,
            overflow: 'hidden',
            height: '100%'
        }}>
            <Box padding={3} sx={{ height: '85%', width: '100%' }}>
                {/* TO KIJIJI BUTTON*/}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Stack spacing={1} direction='row' sx={{ alignItems: 'flex-end' }}>
                        <img src='./images/logo-01.svg' alt='' className='logo-sm' />
                        <Typography variant='body1' sx={{ fontWeight: '500' }}>kijiji mapper</Typography>
                    </Stack>
                    {filters && <Button variant="text" onClick={switchBackToForm}>CHANGE LOCATION</Button>}
                    <Button variant='outlined'>Kijiji</Button>
                </Box>

                {/* START PAGE SLIDES*/}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {welcomePage && <WelcomeComponent switchToForm={switchToForm} />}
                    {locationForm && <LocationForm switchToFilters={switchToFilters} formData={formData} setFormData={setFormData} />}
                    {filters && <Filters formData={formData} setFormData={setFormData} />}
                </Box>

            </Box>

            {/* BOTTOM GREY BAND*/}
            <Box sx={{ height: '16%', background: 'rgba(0,0,0, .05)' }}>
            </Box>

        </Paper>
    )
}

export default FiltersModal