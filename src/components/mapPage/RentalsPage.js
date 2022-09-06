
import { Box, Typography, Modal, Stack } from '@mui/material'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../Context'
import { createRoot } from 'react-dom/client'

import Marker from './mapPageComponents/Markers'
import Popup from './mapPageComponents/Popup'
import MenuBar from './mapPageComponents/MenuBar'
import Cards from './mapPageComponents/Cards'
import FiltersModal from './mapPageComponents/FiltersModal'
import PopupList from './mapPageComponents/PopupList'
import PersistentDrawerLeft from './mapPageComponents/SideBar'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NvYWtsZXlqciIsImEiOiJjbDU1b3BkdGIwcnZwM2RtZnhxdThqZzNsIn0.ir90AYJ272JpNzo3c8HUHg';


const RentalsPage = () => {
    const { loading, open, handleOpen, handleClose, data, handleDrawerOpen, handleRentalFetch, setRentalUrl, handleRentalClick, handleDrawerClose, mediaQueryMd } = useContext(Context)
    const [isActive, setIsActive] = useState(null)

    //MAP
    const mapContainer = useRef(null);
    const map = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15, closeButton: false }))

    const flyToRental = React.useCallback((currentFeature) => {
        map.current.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }, [])

    const createPopUp = React.useCallback((currentFeature) => {
        const popupNode = document.createElement("div")

        const root = createRoot(popupNode)
        root.render(
            <Popup
                mainImage={currentFeature.properties.mainImage}
                bedrooms={currentFeature.properties.bedrooms}
                datePosted={currentFeature.properties.datePosted}
                url={currentFeature.properties.url}
                handleRentalClick={handleRentalClick}
            />
        )
        popUpRef.current
            .setLngLat(currentFeature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map.current)
    }, [])

    //CREATE MAP
    useEffect(() => {
        if (loading) return
        // if (map.current) return; // initialize map only once
        console.log("map initializing")
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/gcoakleyjr/cl6vjuq35000314l2d5mgc07m',
            center: [data.cityCoordinates.coordinates[0], data.cityCoordinates.coordinates[1]],
            zoom: 11.2
        });
    }, [loading]);

    //MAP FEATURES ON ON CLICK
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        map.current.on('load', () => {

            //RENTAL DATA SOURCE
            map.current.addSource('data', {
                'type': 'geojson',
                'data': data,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 10, // Radius of each cluster when clustering points (defaults to 50)
            });

            //RENTAL DATA AS CLUSTERS
            map.current.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'data',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        'cadetblue',
                        100,
                        'cadetblue',
                        750,
                        'cadetblue'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20, //size of circle 
                        100,
                        30, //size of circle
                        750,
                        40 //size of circle
                    ]
                }
            });

            //CLUSTER NUMBER COUNT
            map.current.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'data',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                paint: {
                    "text-color": "#ffffff"
                }
            });

            //RENTAL DATA AS POINTS
            map.current.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'data',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': 'cadetblue',
                    'circle-radius': 9,
                    'circle-stroke-width': 3,
                    'circle-stroke-color': '#fff'
                }
            });

            //CLUSTER ON CLICK
            map.current.on('click', 'clusters', (e) => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;

                const clusterSource = map.current.getSource('data')

                clusterSource.getClusterChildren(clusterId, function (err, list) {
                    console.log('getClusterChildren', list);
                    const popupNode = document.createElement("div")

                    const root = createRoot(popupNode)
                    root.render(
                        <PopupList
                            list={list}
                            handleDrawerOpen={handleDrawerOpen}
                            handleRentalFetch={handleRentalFetch}
                            setRentalUrl={setRentalUrl}
                            handleRentalClick={handleRentalClick}
                            mediaQueryMd={mediaQueryMd}
                        />
                    )
                    popUpRef.current
                        .setLngLat(features[0].geometry.coordinates)
                        .setDOMContent(popupNode)
                        .addTo(map.current)

                });

                handleDrawerClose()
                //ZOOM TO CLUSTOR POINT
                clusterSource.getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;

                        map.current.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom - 1
                        });
                    }
                );
            });

            //POINT ON CLICK
            map.current.on("click", e => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ["unclustered-point"]
                });
                if (!features.length) return;

                const clickedPoint = features[0];

                createPopUp(clickedPoint)
                flyToRental(clickedPoint)
                setIsActive(clickedPoint.properties.id)
                handleDrawerClose()
            })


            //CREATE PRICE MARKERS ON MAP
            data.features.forEach((feature) => {
                // Create a React ref
                const ref = React.createRef();
                // Create a new DOM node and save it to the React ref
                ref.current = document.createElement("div");
                const priceJSX = <Typography variant='p'>{feature.properties.price}</Typography>
                // Render a Marker Component on our new DOM node
                const root = createRoot(ref.current)
                root.render(
                    <Marker feature={feature} children={priceJSX} />
                );

                // Create a Mapbox Marker at our new DOM node
                new mapboxgl.Marker(ref.current)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map.current);
            });

            // map.on('mouseenter', 'unclustered-point', () => {
            //     map.getCanvas().style.cursor = 'pointer';
            //     console.log("enter")
            // });
            // map.on('mouseleave', 'unclustered-point', () => {
            //     map.getCanvas().style.cursor = '';
            // });

            // Add navigation control (the +/- zoom buttons)
            if (mediaQueryMd) {
                map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
            }



        });
        // Clean up on unmount
        return () => map.current.remove();
    }, [loading]);



    return (
        <Box component='main' sx={{ height: '100vh', overflow: 'hidden' }}>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <PersistentDrawerLeft />

            <Stack direction='row' sx={{ height: '100%' }} >
                {
                    mediaQueryMd
                    &&
                    <Box sx={{ height: '100%', overflow: 'scroll', minWidth: '450px' }} >
                        <Cards
                            isActive={isActive}
                            setIsActive={setIsActive}
                            flyToStore={flyToRental}
                            createPopUp={createPopUp}
                            data={data}
                        />
                    </Box>
                }

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Box ref={mapContainer} className="map-container" />
                        <MenuBar handleOpen={handleOpen} />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            disableEnforceFocus
                        >
                            <Box sx={{
                                height: '630px',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: '900px',
                                width: '100%',

                            }}>
                                <FiltersModal />
                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}

export default RentalsPage