import React, { useContext } from 'react'
import { Context } from '../../Context'

import { Stack, Box, Typography, Button } from '@mui/material'

const PopupList = ({ list, handleDrawerOpen, handleRentalFetch, setRentalUrl }) => {

    function handleListClick(url) {
        setRentalUrl(url)
        handleDrawerOpen()
        handleRentalFetch()
    }

    const rentalItems = list.map((item, i) => {
        return (
            <Box key={i} onClick={() => handleListClick(item.properties.url)} className="list-item" sx={{ height: '80px', display: 'flex', flexDirection: 'row', width: '100%', cursor: 'pointer' }}>
                <Box sx={{ height: '100%', overflow: 'hidden', width: '30%', marginRight: '.5rem' }}>
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
        <Stack spacing={1} className="popup-list" sx={{ maxHeight: '320px', overflowY: 'scroll', padding: '.5rem', width: '345px' }}>
            {rentalItems}
        </Stack>
    )
}

export default React.memo(PopupList)