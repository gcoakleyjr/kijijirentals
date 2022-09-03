import React, { useContext } from 'react'
import { Context } from '../Context'

import { Button, Typography, Stack, Link, Box } from '@mui/material'
import WelcomeComponent from '../startingPage/LandingPageComponents/WelcomeComponent'
import LocationForm from '../startingPage/LandingPageComponents/LocationForm'
import Filters from '../startingPage/LandingPageComponents/Filters'

import { useTransition, animated } from 'react-spring'

const FormSlides = () => {
    const { formData, setFormData, welcomePage, locationForm, filters, switchToFilters, switchToForm, switchBackToForm } = useContext(Context)
    const transitionStyles = {
        from: { x: 0, y: 300, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 50, opacity: 0 },
        exitBeforeEnter: true
    }
    const transitionWelcome = useTransition(welcomePage, transitionStyles)
    const transitionLocation = useTransition(locationForm, transitionStyles)
    const transitionFilters = useTransition(filters, transitionStyles)

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box padding={3} sx={{ height: '85%', width: '100%' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    {/* LOGO*/}
                    <Stack spacing={1} direction='row' sx={{ alignItems: 'flex-end', cursor: 'pointer' }}>
                        <img src='./images/logo-01.svg' alt='' className='logo-sm' />
                        <Typography variant='body1' sx={{ fontWeight: '500' }}>kijiji mapper</Typography>
                    </Stack>
                    {/* BACK TO LOCATION FORM*/}
                    {filters && <Button variant="text" onClick={switchBackToForm}>CHANGE LOCATION</Button>}
                    {/* TO KIJIJI BUTTON*/}
                    <Link underline="none" href='https://www.kijiji.ca/' rel="noopener" target="_blank" sx={{ marginLeft: '50px' }}>
                        <Button variant='outlined' sx={{ height: '35px' }}>Kijiji</Button>
                    </Link>
                </Box>

                {/* START PAGE SLIDES*/}
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    {transitionWelcome((styles, item) => item && <animated.div style={styles}><WelcomeComponent switchToForm={switchToForm} /></animated.div>)}
                    {transitionLocation((styles, item) => item && <animated.div style={styles}><LocationForm switchToFilters={switchToFilters} formData={formData} setFormData={setFormData} /></animated.div>)}
                    {transitionFilters((styles, item) => item && <animated.div style={styles}><Filters formData={formData} setFormData={setFormData} /></animated.div>)}
                </Box>

            </Box>

            {/* BOTTOM GREY BAND*/}
            <Box sx={{ height: '16%', background: 'rgba(0,0,0, .05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction='row' sx={{ justifyContent: 'space-around', width: '50%', opacity: '.5' }}>
                    <Button>
                        <Link href='/' variant='caption' underline="hover" className='nav-buttons'>Home</Link>
                    </Button>
                    <Button>
                        <Link href='https://www.kijiji.ca/' variant='caption' underline="hover" rel="noopener" target="_blank" className='nav-buttons'>Kijiji</Link>
                    </Button>
                    <Button>
                        <Link href='https://gioco.netlify.app/' variant='caption' underline="hover" rel="noopener" target="_blank" className='nav-buttons'>Contact</Link>
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default FormSlides