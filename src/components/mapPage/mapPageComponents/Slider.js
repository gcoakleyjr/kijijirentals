import React from 'react'
import Slider from "react-slick";
import { Box } from '@mui/material';



export const SliderComponent = ({ images }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slides = images.map((image, i) => {
        return (
            <Box key={i}>
                <img src={image} alt="" className='rentalDetailImg' />
            </Box>
        )
    })
    return (
        <Slider {...settings}>
            {slides}
        </Slider>
    )
}
