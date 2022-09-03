import React from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalHotelOutlinedIcon from '@mui/icons-material/LocalHotelOutlined';
import Avatar from '@mui/material/Avatar';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from '@mui/material';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



function RentalCardDesktop({ data, setIsActive, isActive, id, flyToStore, createPopUp, handleRentalClick }) {



  function activeRental() {
    setIsActive(id)
    flyToStore(data)
    createPopUp(data)
  }



  return (

    <Card sx={{ width: '95%', cursor: 'pointer' }} elevation={3} onClick={activeRental} className={isActive === id ? 'active' : ''} id={`card-${id}`}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: isActive === id ? '#5f9ea0' : '#99cccd' }}>
            <HouseRoundedIcon />
          </Avatar>
        }
        title={data.properties.title}
        subheader={data.properties.price}
      />
      <CardMedia
        sx={{ maxHeight: '400px' }}
        component="img"
        height="50%"
        image={data.properties.mainImage}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <LocationOnIcon sx={{ transform: 'translateY(7px)' }} />{data.properties.location[0] === " " ? 'No Location Available' : data.properties.location}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="beds">
          <LocalHotelOutlinedIcon />
        </IconButton>
        <Typography variant='caption' sx={{ transform: 'translateY(2px)', marginRight: '0.5rem' }}>{data.properties.bedrooms}</Typography>
        <IconButton aria-label="to-ad" className='to-kijiji'>
          <Link href={`https://www.kijiji.ca${data.properties.url}`} target="_blank" rel="noopener"><LaunchIcon sx={{ transform: 'translateY(3px)' }} /></Link>
        </IconButton>

        <ExpandMore
          onClick={() => handleRentalClick(data.properties.url)}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  )
}

export default React.memo(RentalCardDesktop)