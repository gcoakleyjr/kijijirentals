import React from 'react'


import { Stack, Box, Typography, Button } from '@mui/material'

const PopupList = ({ list, handleRentalClick }) => {



    const rentalItems = list.map((item, i) => {
        return (
            <Box
                key={i}
                onClick={() => handleRentalClick(item.properties.url)}
                className="list-item"
                sx={{
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    cursor: 'pointer'
                }}>
                <Box
                    sx={{
                        height: '100%',
                        overflow: 'hidden',
                        width: '30%',
                        marginRight: '.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <img src={item.properties.mainImage} alt="" className="list-item-image" />
                </Box>
                <Stack sx={{ width: '70%' }}>
                    <Box>
                        <Button variant="text">{item.properties.price}</Button>
                    </Box>
                    <Typography variant='caption' sx={{ paddingLeft: '8px' }}>{item.properties.title}</Typography>
                </Stack>

            </Box>
        )
    })

    return (
        <Stack
            spacing={1}
            className="popup-list"
            sx={{
                maxHeight: '320px',
                overflowY: 'scroll',
                padding: '.5rem',
                width: '345px'
            }}>
            {rentalItems}
        </Stack>
    )
}

export default React.memo(PopupList)