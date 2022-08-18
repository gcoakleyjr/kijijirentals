import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import PaidIcon from '@mui/icons-material/Paid';

import React, { useContext } from 'react'
import { Context } from '../../Context';
import { Link } from 'react-router-dom'
import { unitType, bedrooms } from '../../../utils/filterParameters';
import { Typography } from '@mui/material';

const Filters = ({ formData, setFormData }) => {
    const { handleFetch } = useContext(Context)

    function handleUnitChange(e, value) {
        const unitCode = value.length > 0 ? value[0].unitCode : ''
        const units = value.length > 0 && value[0].cat === 'unit' ? value.map(val => val.id) : ''
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                unitCode: unitCode,
                unit: units
            }
        })
    }

    function handleRoomChange(e, value) {
        const roomCode = value.length > 0 ? value[0].roomCode : ''
        const rooms = value.length > 0 && value[0].cat === 'rooms' ? value.map(val => val.id) : ''
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                roomCode: roomCode,
                rooms: rooms
            }
        })
    }


    function valuetext(value) {
        return `$${formData.price}`;
    }

    const handleChange = (event, newValue) => {
        setFormData(prev => {
            return {
                ...prev,
                price: newValue
            }
        })
    };

    return (
        <Stack spacing={4} sx={{ maxWidth: '600px', minWidth: '300px', alignItems: 'center' }}>
            <Typography variant='h2'>What kind of place?</Typography>
            <Autocomplete
                multiple
                onChange={handleUnitChange}
                id="unit-type"
                options={unitType}
                sx={{ minWidth: '300px' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Unit Type"
                        placeholder={formData.unitCode ? 'Unit Type' : 'No preference'}
                    />
                )}
            />

            <Autocomplete
                multiple
                onChange={handleRoomChange}
                sx={{ minWidth: '300px' }}
                id="bedrooms"
                options={bedrooms}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Bedrooms"
                        placeholder={formData.roomCode ? 'Bedrooms' : 'No preference'}
                    />
                )}
            />

            <Box sx={{ width: '100%' }}>
                <Typography id="input-slider" gutterBottom sx={{ marginBottom: '1rem' }}>
                    Price Range
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <PaidIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={formData.price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                            min={0}
                            max={5000}
                            step={20}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Link to={'/rentals'} onClick={handleFetch} >
                <IconButton size="large" color="primary">
                    <ArrowCircleRightRoundedIcon sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            </Link>

        </Stack>
    )
}

export default Filters