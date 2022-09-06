import React, { useState, useContext } from 'react'
import { Context } from '../../Context.js';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'
import { IconButton, Stack } from '@mui/material';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

import { provinces, areas } from '../../../utils/filterParameters.js';

const Input = styled(MuiInput)`
  width: 42px;
`;

const LocationForm = ({ switchToFilters, formData, setFormData }) => {
    const { mediaQueryMd } = useContext(Context)

    //STATES
    const [cityShow, setCityShow] = useState(false)
    const [options, setOptions] = useState(areas.Ontario)
    const [next1Button, setNext1Button] = useState(false)
    const [next2Button, setNext2Button] = useState(false)


    //FUNCTIONS
    function showLocation() {
        setCityShow(true)
    }

    function handleFormChange(e, value) {
        const { cat, id, label } = value
        setNext1Button(true)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [cat]: [id, label]
            }
        })
    }

    function handleProvinceChange(e, value) {
        const { cat, label, areaMatch } = value
        setCityShow(false)
        setNext1Button(false)
        setNext2Button(true)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                area: "",
                [cat]: label
            }
        })

        setOptions(() => {
            const findArea = Object.entries(areas).filter((v) => v[0] === areaMatch)
            return findArea[0][1]
        })
    }



    const handleSliderChange = (event, newValue) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                distance: newValue
            }
        })
    };

    const handleInputChange = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                distance: event.target.value === '' ? '' : Number(event.target.value)
            }
        });
    };

    const handleBlur = () => {
        if (formData.distance < 0) {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    distance: 0
                }
            });
        } else if (formData.distance > 100) {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    distance: 100
                }
            });
        }
    };

    return (
        <Stack spacing={mediaQueryMd ? 2 : 1} sx={{ maxWidth: '600px', alignItems: 'center' }}>

            <Typography variant='h2' sx={{ fontWeight: 100 }}>
                Where to look?
            </Typography>

            <Autocomplete
                onChange={handleProvinceChange}
                disablePortal
                id="selectProvince"
                options={provinces}
                sx={{ maxWidth: 300, minWidth: 200, width: '80%' }}
                renderInput={(params) => <TextField {...params} label="Province" />}
            />

            {next2Button &&
                <IconButton size="large" color="primary" onClick={showLocation}>
                    <ArrowDropDownCircleRoundedIcon sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            }

            {cityShow &&
                <Stack spacing={mediaQueryMd ? 2 : 1} sx={{ width: '100%', alignItems: 'center' }}>
                    <Autocomplete

                        onChange={handleFormChange}
                        disablePortal
                        id="selectArea"
                        options={options}
                        sx={{ maxWidth: 300, minWidth: 200, width: '80%' }}
                        renderInput={(params) => <TextField {...params} label="Area" />}
                    />

                    <Box sx={{ maxWidth: 300, minWidth: 200, width: '80%' }}>
                        <Typography id="input-slider" gutterBottom>
                            Distance
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <ExpandRoundedIcon />
                            </Grid>
                            <Grid item xs>
                                <Slider
                                    value={typeof formData.distance === 'number' ? formData.distance : 0}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    value={formData.distance}
                                    size="small"
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 100,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                </Stack>
            }
            {next1Button &&
                <IconButton size="large" color="primary" onClick={switchToFilters}>
                    <ArrowCircleRightRoundedIcon sx={{ fontSize: '2.5rem' }} />
                </IconButton>
            }




        </Stack>
    )
}

export default LocationForm