import React from 'react'
import { Paper, } from '@mui/material'

import FormSlides from '../../components/FormSlides'

const FiltersModal = () => {

    return (
        <Paper sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            background: 'linear-gradient(120deg, rgba(255,255,250,1) 0%, rgba(239,242,240,1) 100%)',
            border: "3px solid rgba(200, 200, 200, .3)",
            borderRadius: '24px',
            boxShadow: 24,
            overflow: 'hidden',
            height: '100%'
        }}>

            <FormSlides />

        </Paper>
    )
}

export default FiltersModal