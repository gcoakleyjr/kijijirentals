
import { Box, Button, Grid, Typography, Modal } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../Context'
import { createRoot } from 'react-dom/client'

import Marker from './mapPageComponents/Markers'
import Popup from './mapPageComponents/Popup'
import MenuBar from './mapPageComponents/MenuBar'
import Cards from './mapPageComponents/Cards'
import FiltersModal from './mapPageComponents/FiltersModal'

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NvYWtsZXlqciIsImEiOiJjbDU1b3BkdGIwcnZwM2RtZnhxdThqZzNsIn0.ir90AYJ272JpNzo3c8HUHg';



// const data = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "properties": {
//                 "title": "renovated two bedroom Castle Frank and Bloor - ID 2204",
//                 "url": "/v-apartments-condos/city-of-toronto/renovated-two-bedroom-castle-frank-and-bloor-id-2204/1623099780",
//                 "price": "$3,450.00",
//                 "distance": "< 3 km",
//                 "location": " and , Toronto",
//                 "description": "Renovated Akelius two bedroom apartment for rent. Bloor & Castle Frank in the Downtown East neighborhood, Toronto. renovated two bedroom suite - 1 bathroom - located on floor 3 - approximately 1050 ...",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "27/07/2022",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/12/12699d67-6c32-405c-ad85-387af60b0560?rule=kijijica-200-jpg",
//                 "id": 0
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bedroom Apartments for Rent on Queen Street East",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bedroom-apartments-for-rent-on-queen-street-east/1608428883",
//                 "price": "$2,432.00",
//                 "distance": "< 9 km",
//                 "location": "Queen Street East and Courcelette Road, Toronto",
//                 "description": "* Join Us For Our Open House Every Wednesday 2:00 - 6:00 pm! Call To Register* The Balmy Beach Club offers endless activities including a fitness center, hockey, lawn bowling, paddling, rugby, ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/fd/fdfe259a-f67a-4765-ace1-ef4d975af515?rule=kijijica-200-jpg",
//                 "id": 1
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "West Lodge | Parkdale | Spacious Bachelor Suite!",
//                 "url": "/v-apartments-condos/city-of-toronto/west-lodge-parkdale-spacious-bachelor-suite/1620437681",
//                 "price": "$1,389.00",
//                 "distance": "< 4 km",
//                 "location": " and , Toronto",
//                 "description": "Perfectly located Bachelor apartmentavailable now in the heart of Parkdale. Feel the heartbeat of the city right outside your door, but come home to a quiet, treelined street, tucked away from the ...                                                                                                                                                                                                                                                                                    West Lodge |  It's time to expect more from the place you call home.",
//                 "bedrooms": "Beds: Bachelor/Studio",
//                 "datePosted": "15/08/2022",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/b2/b2f598f0-994a-4c3c-bd9f-904335103c79?rule=kijijica-200-jpg",
//                 "id": 2
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1BR & 2BR Brand new Condo units w/Parking at St Clair & Keele St",
//                 "url": "/v-apartments-condos/city-of-toronto/1br-2br-brand-new-condo-units-w-parking-at-st-clair-keele-st/1619544227",
//                 "price": "$2,200.00",
//                 "distance": "< 8 km",
//                 "location": "St Clair Avenue West and Cobalt Avenue, Toronto",
//                 "description": "Looking for a couple/working professional to lease brand new Condo units at St. Clair Ave & Keele available immediately !! Steps to Loblaws, Walmart, LCBO, Runnymede TTC Station, The Junction, ...                                                                                                                                                                                                                                                                                    Leasing Condos all over GTA!! Studio, 1 Bedroom, 1+Den, 2 bedroom, 3 Bedroom....CALL NOW!!",
//                 "bedrooms": "Beds: 2 + Den",
//                 "datePosted": "14/08/2022",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/d6/d65e26ee-2f6a-4c55-8c6a-9c9e21756993?rule=kijijica-200-jpg",
//                 "id": 3
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4662,
//                     43.6633
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Newly Designed 1 Bdrm. for Rent  - Woodbine/Gerrard East",
//                 "url": "/v-apartments-condos/city-of-toronto/newly-designed-1-bdrm-for-rent-woodbine-gerrard-east/1623912546",
//                 "price": "$2,150.00",
//                 "distance": "< 7 km",
//                 "location": " and , Toronto",
//                 "description": "Touch free leasing:Virtual viewings available via video conferencing. Book yours today. Our Rental Office remains operational in light of COVID-19. The health and safety of you, employees, residents ...                                                                                                                                                                                                                                                                                    Proudly Managed by Realstar Management!  Beachhill Apartments Offers Premium 1 Bedroom, 1 Bedroom + Den, 2 Bedroom and Penthouse Suites!  Up to $1500 in Move-in Bonuses on Select Suites Rented by April 30th!* Office Open Daily!",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "02/08/2022",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/3b/3b0df486-3686-4b54-b1f5-8e36c0fe2078?rule=kijijica-200-jpg",
//                 "id": 4
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1st Oct, 1+Den condo MAPLE LEAF SQUARE DOWNTOWN  TORONTO",
//                 "url": "/v-apartments-condos/city-of-toronto/1st-oct-1-den-condo-maple-leaf-square-downtown-toronto/1629415255",
//                 "price": "$2,450.00",
//                 "distance": "Near you",
//                 "location": "Lower Simcoe Street and Bremner Boulevard, Toronto",
//                 "description": "1+den Lux.condo Prime location MAPLE LEAF SQ. Downtown Toronto this add is still up , this property is still available for rent. One+Den luxury Condo available October 1st, for rent. Prime location ...",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 3 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/29/297577b5-d8c1-4927-99ac-ffa21ba62ce1?rule=kijijica-200-jpg",
//                 "id": 5
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -63.381633,
//                     46.423215
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Bright 1-Bdrm + Den Condo at Church and Carlton",
//                 "url": "/v-apartments-condos/city-of-toronto/bright-1-bdrm-den-condo-at-church-and-carlton/1629413564",
//                 "price": "$2,850.00",
//                 "distance": "Near you",
//                 "location": "King Street East and Jarvis Street, Toronto",
//                 "description": "Axis condos, a unique build in the heart of the city, is bright and inviting. This modern one-bedroom plus den condo on the 27th floor has an open-concept kitchen and living room with ...",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 13 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/28/28cc8f2f-868e-42a3-81b0-4fef3120ee3b?rule=kijijica-200-jpg",
//                 "id": 6
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Gorgeous, spacious modern studio downtown condo for rent",
//                 "url": "/v-apartments-condos/city-of-toronto/gorgeous-spacious-modern-studio-downtown-condo-for-rent/1629413436",
//                 "price": "$1,900.00",
//                 "distance": "< 2 km",
//                 "location": "Dundas Street East and Sumach Street, Toronto",
//                 "description": "Gorgeous, spacious modern studio downtown condo for rent. With a separate kitchen area with island, large balcony, en suite washer/dryer, stainless steel appliances. High ceiling that makes the place ...",
//                 "bedrooms": "Beds: Bachelor/Studio",
//                 "datePosted": "< 15 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/42/4208f5be-7c1d-4626-ba87-c2da95be0b52?rule=kijijica-200-jpg",
//                 "id": 7
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3463664,
//                     43.6634539
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Furnished Apartment Downtown Toronto Apartment for Ren",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-furnished-apartment-downtown-toronto-apartment-for-ren/1624371627",
//                 "price": "$2,700.00",
//                 "distance": "< 2 km",
//                 "location": " and , Toronto",
//                 "description": "Welcome to Sherbourne Estates located at 201 Sherbourne Street in the heart of downtown Toronto. Sherbourne Estates is a quiet residential property surrounded by well kept grounds. 201 Sherbourne ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 25 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/fd/fdb3d642-ecfc-4c19-867d-1e4dbac86cea?rule=kijijica-200-jpg",
//                 "id": 8
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "Downtown 1 Bedroom Apartment for Rent - 201 Sherbourne Street",
//                 "url": "/v-apartments-condos/city-of-toronto/downtown-1-bedroom-apartment-for-rent-201-sherbourne-street/1606607754",
//                 "price": "$2,025.00",
//                 "distance": "< 2 km",
//                 "location": " and , Toronto",
//                 "description": "Current Promotions View our units by clicking the virtual tour link, schedule a video tour or make an appointment for in person viewing. (647) 699-1574Virtual Open House: View our units by clicking ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 25 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/08/08bb0502-94f2-4920-a100-3c5ca79241cf?rule=kijijica-200-jpg",
//                 "id": 9
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "Downtown 1 Bedroom Luxury Apartment for Rent - 201 Sherbourne St",
//                 "url": "/v-apartments-condos/city-of-toronto/downtown-1-bedroom-luxury-apartment-for-rent-201-sherbourne-st/1620920870",
//                 "price": "$2,099.00",
//                 "distance": "< 2 km",
//                 "location": "Dundas Street East and Sherbourne Street, Toronto",
//                 "description": "Current Promotions View our units by clicking the virtual tour link, schedule a video tour or make an appointment for in person viewing. (647) 699-1574Virtual Open House: View our units by clicking ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 25 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/a4/a42c00ef-58e7-4a69-a7ed-553d47b3dddd?rule=kijijica-200-jpg",
//                 "id": 10
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Downtown 2 Bedroom Apartment for Rent - 201 Sherbourne Street",
//                 "url": "/v-apartments-condos/city-of-toronto/downtown-2-bedroom-apartment-for-rent-201-sherbourne-street/1505788256",
//                 "price": "$2,449.00",
//                 "distance": "< 2 km",
//                 "location": "Dundas Street East and Sherbourne Street, Toronto",
//                 "description": "Current Promotions View our units by clicking the virtual tour link, schedule a video tour or make an appointment for in person viewing. (647) 699-1574Virtual Open House: View our units by clicking ...",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 25 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/de/def5e73c-d4d2-4fa4-847e-b48a400f0e53?rule=kijijica-200-jpg",
//                 "id": 11
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Sep24/Downtown Toronto Cityplace/ 1br+1den + parking +utilities",
//                 "url": "/v-apartments-condos/city-of-toronto/sep24-downtown-toronto-cityplace-1br-1den-parking-utilities/1629411275",
//                 "price": "$2,600.00",
//                 "distance": "Near you",
//                 "location": "Spadina Avenue and Front Street West, Toronto",
//                 "description": "Mid Sept/Downtown Toronto Cityplace/ 1br+1den + parking + utilities Downtown Toronto living at cityplace. Available September 24. Please see the virtual tour here. https://youtu.be/9YuLtqRgjMQ",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 30 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/12/129c430e-4844-420e-8546-57e1edcd9ee5?rule=kijijica-200-jpg",
//                 "id": 12
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3894386,
//                     43.6440617
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Elevated Luxury on Grange Park - Big 1bd+1den, Furnished, W/D",
//                 "url": "/v-apartments-condos/city-of-toronto/elevated-luxury-on-grange-park-big-1bd-1den-furnished-w-d/1628601965",
//                 "price": "$2,800.00",
//                 "distance": "Near you",
//                 "location": "Beverley Street and Stephanie Street, Toronto",
//                 "description": "Newly renovated 1+1 apartment in historic house by award-winning architect, Firma. Everything is brand new – you will be the first occupant of a major redesign. Enormous one-bedroom with extra space ...",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 32 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/f2/f291351d-b7eb-4562-931c-96cf2372157b?rule=kijijica-200-jpg",
//                 "id": 13
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.391275,
//                     43.651167
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bdrm Basement Apt on Beautiful Street! Option for parking spot",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bdrm-basement-apt-on-beautiful-street-option-for-parking-spot/1629410380",
//                 "price": "$1,550.00",
//                 "distance": "< 7 km",
//                 "location": "Dufferin Street and Gibson Street, Toronto",
//                 "description": "Hello! We are renting a great 1 Bedroom basement apartment on a beautiful residential street. It's warm in the winter and cool in the summer. It offers a newly renovated washroom, full kitchen, ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 35 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/04/04449754-83e2-4ba2-a036-87e75e27204c?rule=kijijica-200-jpg",
//                 "id": 14
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -63.381633,
//                     46.423215
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bed and Den Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bed-and-den-apartments-for-rent-on-bathurst-street/1629298220",
//                 "price": "$2,560.00",
//                 "distance": "< 5 km",
//                 "location": " and , Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Located just North of St. Clair in Forest Hill, we are just steps away from public ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/89/89333dd5-2750-4820-8e99-65811e2659ea?rule=kijijica-200-jpg",
//                 "id": 15
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-bathurst-street/1613962530",
//                 "price": "$2,025.00",
//                 "distance": "< 5 km",
//                 "location": "Bathurst Street and Lonsmount Drive, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Located just North of St. Clair in Forest Hill, we are just steps away from public ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/67/671ed674-6118-485f-9ec7-f7fac602f654?rule=kijijica-200-jpg",
//                 "id": 16
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4184972,
//                     43.6876884
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Bachelor Apartment for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/bachelor-apartment-for-rent-on-bathurst-street/1629298553",
//                 "price": "$1,761.00",
//                 "distance": "< 5 km",
//                 "location": "Bathurst Street and Lonsmount Drive, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Located just North of St. Clair in Forest Hill, we are just steps away from public ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: Bachelor/Studio",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/76/766fb460-a27e-43e5-87ce-54fd10dc8134?rule=kijijica-200-jpg",
//                 "id": 17
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4184972,
//                     43.6876884
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-bathurst-street/1624113950",
//                 "price": "$1,932.00",
//                 "distance": "< 10 km",
//                 "location": "Bathurst Street and Neptune Drive, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Tuesday, from 4 pm - 6 pm. Call Now to Reserve Your Spot! With easy access to Hwy 401, these Bachelor, 1, and 2 Bedroom apartment rentals offer great access ...                                                                                                                                                                                                                                                                                    Join Us for Our In-person Open House Every Tuesday, from 4 pm - 6 pm. Call Now to Reserve Your Spot!",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/6a/6a63c3ff-aea8-486e-8d14-d83e580a8327?rule=kijijica-200-jpg",
//                 "id": 18
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4326317,
//                     43.7193202
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bedroom Apartments for Rent on Queen Street East",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bedroom-apartments-for-rent-on-queen-street-east/1608428883",
//                 "price": "$2,432.00",
//                 "distance": "< 9 km",
//                 "location": "Queen Street East and Courcelette Road, Toronto",
//                 "description": "* Join Us For Our Open House Every Wednesday 2:00 - 6:00 pm! Call To Register* The Balmy Beach Club offers endless activities including a fitness center, hockey, lawn bowling, paddling, rugby, ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/fd/fdfe259a-f67a-4765-ace1-ef4d975af515?rule=kijijica-200-jpg",
//                 "id": 19
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Queen Street East",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-queen-street-east/1608428904",
//                 "price": "$1,799.00",
//                 "distance": "< 9 km",
//                 "location": "Queen Street East and Courcelette Road, Toronto",
//                 "description": "* Join Us For Our Open House Every Wednesday 2:00 - 6:00 pm! Call To Register* The Balmy Beach Club offers endless activities including a fitness center, hockey, lawn bowling, paddling, rugby, ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/d5/d546c31f-4545-40ae-bd88-2aa268c6e23c?rule=kijijica-200-jpg",
//                 "id": 20
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Queen Street East",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-queen-street-east/1608428584",
//                 "price": "$1,797.00",
//                 "distance": "< 9 km",
//                 "location": "Queen Street East and Victoria Park Avenue, Toronto",
//                 "description": "*Join Us For Our Open House Dates on Sunday the 15th and 29th from 2:00 - 5:00pm* Property Features These exceptional low-rise properties sit on the north side of Queen Street East just east of ...                                                                                                                                                                                                                                                                                    Ask About our Rental Incentive!",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/a6/a61f579b-ca5b-4dd3-84d9-3031ed57cc62?rule=kijijica-200-jpg",
//                 "id": 21
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.383935,
//                     43.653482
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-bathurst-street/1611219030",
//                 "price": "$2,154.00",
//                 "distance": "< 6 km",
//                 "location": "Bathurst Street and Ava Road, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! With its highly desirable Forest Hill location, Ava Manor combines old-world charm with ...                                                                                                                                                                                                                                                                                    Enjoy Condo Style Living Without the Fees",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/5d/5dfc3564-8ed2-42a5-9d5f-742f08e2c6cf?rule=kijijica-200-jpg",
//                 "id": 22
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4273976,
//                     43.6971121
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bedroom Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bedroom-apartments-for-rent-on-bathurst-street/1613949090",
//                 "price": "$2,399.00",
//                 "distance": "< 6 km",
//                 "location": "Bathurst Street and Warwick Avenue, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Experience the charm of this historic three-story Toronto apartment building with a ...                                                                                                                                                                                                                                                                                    1 Month FREE on 13 Month Lease",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 39 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/18/18d432f8-e573-4c73-8662-85ac2323f6eb?rule=kijijica-200-jpg",
//                 "id": 23
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.427095,
//                     43.6952147
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bedroom Apartment for Rent on Eglington Ave West",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bedroom-apartment-for-rent-on-eglington-ave-west/1613947239",
//                 "price": "$2,259.00",
//                 "distance": "< 7 km",
//                 "location": "Eglinton Avenue West and Flanders Road, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Located in the Cedarvale-Forest Hill neighbourhood, this rental property features ...                                                                                                                                                                                                                                                                                    2 Months Free on a 14 Month Lease",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 40 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/3a/3a82683a-5b04-4c20-9893-55f1beaa1d16?rule=kijijica-200-jpg",
//                 "id": 24
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4662,
//                     43.6633
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartments for Rent on Bathurst Street",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartments-for-rent-on-bathurst-street/1613949087",
//                 "price": "$1,743.00",
//                 "distance": "< 6 km",
//                 "location": "Bathurst Street and Warwick Avenue, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Experience the charm of this historic three-story Toronto apartment building with a ...                                                                                                                                                                                                                                                                                    1 Month FREE on 13 Month Lease",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 40 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/7b/7b731837-aadd-404a-bd78-819763beed31?rule=kijijica-200-jpg",
//                 "id": 25
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.427095,
//                     43.6952147
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartment for Rent on Eglington Ave West",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartment-for-rent-on-eglington-ave-west/1613947224",
//                 "price": "$1,827.00",
//                 "distance": "< 7 km",
//                 "location": "Eglinton Avenue West and Flanders Road, Toronto",
//                 "description": "Join Us for Our In-person Open House Every Wednesday & Friday, from 4pm to 6pm. Call Now to Reserve Your Spot! Located in the Cedarvale-Forest Hill neighbourhood, this rental property features ...                                                                                                                                                                                                                                                                                    2 Months Free on a 14 Month Lease",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 40 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/6d/6d1073d9-591b-4e58-a84a-f86ecd0d34c0?rule=kijijica-200-jpg",
//                 "id": 26
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4662,
//                     43.6633
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Downtown 1 Bedroom Apartment for Rent - 77 Wellesley Street East",
//                 "url": "/v-apartments-condos/city-of-toronto/downtown-1-bedroom-apartment-for-rent-77-wellesley-street-east/1619865969",
//                 "price": "$2,130.00",
//                 "distance": "< 2 km",
//                 "location": "Church Street and Wellesley Street East, Toronto",
//                 "description": "Current Promotions View our units by clicking the virtual tour link, schedule a video tour or make an appointment for in person viewing. Call: (647) 424-1549Virtual Open House: View our units by ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 43 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/bc/bc8b2596-f083-4055-a1b1-43bf8f0144e1?rule=kijijica-200-jpg",
//                 "id": 27
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3735007,
//                     43.667162
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "3 BED | 1 BATH - UPPER LEVEL UNIT FOR RENT - TORONTO",
//                 "url": "/v-apartments-condos/city-of-toronto/3-bed-1-bath-upper-level-unit-for-rent-toronto/1627587590",
//                 "price": "$3,245.00",
//                 "distance": "< 8 km",
//                 "location": "Queen Street East and Beech Avenue, Toronto",
//                 "description": "3 Bedrooms | 1 Bathroom, Brand New Kitchen, Stainless Steel Appliances, Dishwasher, Stone Countertops, Personal Thermostat, Cleaned In Details. OPEN 24/7 - HAVE QUESTIONS? CALL US ANY TIME: ...                                                                                                                                                                                                                                                                                    91 Beech Avenue, Toronto, Ontario M4E 3H5 Close to Kingston Road, Queen Street East at Beech Avenue Bus Stop, Balmy Beach Community School, Glen Stewart Park, Dentonia Park, Gerrard Square, Eglinton Square Shopping Centre, Museum of Illusions, The Di",
//                 "bedrooms": "Beds: 3",
//                 "datePosted": "< 45 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/c4/c49e6086-0f43-416c-a9fe-51903c3f5e80?rule=kijijica-200-jpg",
//                 "id": 28
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 BED+DEN | 1 BATH - CONDO APT FOR RENT - TORONTO | KING ST W",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bed-den-1-bath-condo-apt-for-rent-toronto-king-st-w/1627230103",
//                 "price": "$2,195.00",
//                 "distance": "Near you",
//                 "location": " and , Toronto",
//                 "description": "1 Bedroom+Den | 1 Bathroom, Upgraded Kitchen, Stainless Steel Appliances, Dishwasher, Stone Countertops, Laminate Floors, Ensuite Laundry. OPEN 24/7 - HAVE QUESTIONS? CALL US ANY TIME: 905-385-8150 ...                                                                                                                                                                                                                                                                                    88 Scott Street, Toronto, Ontario M5E 0A9 Close to Gardiner Expressway, King Subway Station, Yonge Street at Wellington Street West Bus Stop, Keystone Schools, Harbour Square Park, The Distillery Historic District, Nathan Phillips Square, St. Lawrenc",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/c4/c40f04fe-94cb-47b3-8fa3-fd84734756c2?rule=kijijica-200-jpg",
//                 "id": 29
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 BED+DEN | 1 BATH - CONDO APT FOR RENT - TORONTO",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bed-den-1-bath-condo-apt-for-rent-toronto/1627966931",
//                 "price": "$2,145.00",
//                 "distance": "< 5 km",
//                 "location": " and , Toronto",
//                 "description": "1 Bedroom+Den | 1 Bathroom, Brand New Kitchen, Paneled Appliances, Dishwasher, Microwave, Stone Countertops, Laminate Floors, Ensuite Laundry. OPEN 24/7 - HAVE QUESTIONS? CALL US ANY TIME: ...                                                                                                                                                                                                                                                                                    840 St Clair Avenue West, Toronto, Ontario M6C 0A4 Close to Allen Road, St. Clair West Subway Station, St Clair Avenue West at Winona Drive Bus Stop, Winona Drive Senior Public School, Dovercourt Park, Dufferin Mall, Galleria Shopping Centre, Yorkvil",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/b8/b8bc2efc-89a3-4ac4-96e4-2122c9190086?rule=kijijica-200-jpg",
//                 "id": 30
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "3 BED | 2 BATH - DETACHED HOUSE FOR RENT - TORONTO | EGLINTON AV",
//                 "url": "/v-apartments-condos/city-of-toronto/3-bed-2-bath-detached-house-for-rent-toronto-eglinton-av/1628728025",
//                 "price": "$3,245.00",
//                 "distance": "< 7 km",
//                 "location": "Eglinton Avenue East and Mann Avenue, Toronto",
//                 "description": "3 Bedrooms | 2 Bathrooms, Upgraded Kitchen, Back Splash, Stainless Steel Appliances, Formica Countertops, Dishwasher, Microwave, Ensuite Laundry, Hardwood Floors, Front Porch & Backyard Deck, Tons of ...                                                                                                                                                                                                                                                                                    51 Mann Avenue, Toronto, Ontario M4S 2Y2, Close to Don Valley Parkway, Eglinton Station, Davisville Station, Eglinton Avenue East at Bayview Avenue, MT Pleasant Road at Soudan Avenue, Northern Secondary School, Greenwood College School",
//                 "bedrooms": "Beds: 3",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/f1/f16dcfa9-e9af-43e9-b40b-c087a20ff116?rule=kijijica-200-jpg",
//                 "id": 31
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "4 BED | 3 BATH - MAIN FLOOR FOR RENT - SCARBOROUGH",
//                 "url": "/v-apartments-condos/city-of-toronto/4-bed-3-bath-main-floor-for-rent-scarborough/1627917736",
//                 "price": "$3,595.00",
//                 "distance": "< 9 km",
//                 "location": " and , Toronto",
//                 "description": "4 Bedrooms | 2.5 Bathrooms, Upgraded Kitchen, Stainless Steel Appliances, Dishwasher, Microwave, Ice Maker, Back Splash, Stone Countertops, Ensuite Laundry, Personal Thermostat, Fireplace, Hardwood ...                                                                                                                                                                                                                                                                                    50 Madelaine Avenue, Scarborough, Ontario M1L 2X7, Close to Kingston Road, Victoria Park, Main Street, Taylor Creek Public School, Crescent Town Elementary School, Dentonia Park, Prairie Drive Park, Gerrard Square, Eglinton Square Shopping Centre, On",
//                 "bedrooms": "Beds: 4",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/7e/7eac8b5d-5417-457b-ba68-a7a28b9cfd7b?rule=kijijica-200-jpg",
//                 "id": 32
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 BED | 1 BATH - CONDO APT - TORONTO | FORT YORK BLVD",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bed-1-bath-condo-apt-toronto-fort-york-blvd/1628350129",
//                 "price": "$2,195.00",
//                 "distance": "< 2 km",
//                 "location": "Fort York Boulevard and Grand Magazine Street, Toronto",
//                 "description": "1 Bedroom | 1 Bathroom, Stainless Steel Appliances, Dishwasher, Microwave, Stone Countertops, Laminate Floors, Ensuite Laundry. OPEN 24/7 - HAVE QUESTIONS? CALL US ANY TIME: 905-385-8150 Note: The ...                                                                                                                                                                                                                                                                                    50 Bruyeres Mews, Toronto, Ontario M5V 0H8 Close to Gardiner Expressway, Strachan Avenue Fleet Street Bus Stop, Ryerson Community School, High Park, Chinatown Centre, Toronto Music Garden, The Distillery Historic District, Art Gallery of Ontario, Rip",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/a8/a863ad43-4fe5-4331-bc58-861f6d1d513e?rule=kijijica-200-jpg",
//                 "id": 33
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.54,
//                     43.83
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 BED | 1 BATH - CONDO APT FOR RENT - TORONTO | BAY ST",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bed-1-bath-condo-apt-for-rent-toronto-bay-st/1628089993",
//                 "price": "$2,199.00",
//                 "distance": "< 2 km",
//                 "location": " and , Toronto",
//                 "description": "1 Bedroom | 1 Bathroom, Upgraded Kitchen, White Appliances, Dishwasher, Stone Countertops, Personal Thermostat, Ensuite Laundry. OPEN 24/7 - HAVE QUESTIONS? CALL US ANY TIME: 905-385-8150 Note: The ...                                                                                                                                                                                                                                                                                    1055 Bay Street, Toronto, Ontario M5S 3A3 Close to Don Valley Parkway, Bay Subway Station, Bay Street at Charles Street West South Side Bus Stop, Jesse Ketchum Junior and Senior Public School, Queen's Park, Royal Ontario Museum, The Distillery Histor",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 46 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/df/dff3841c-4cfe-49b8-9866-e2a88ca9d485?rule=kijijica-200-jpg",
//                 "id": 34
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "Basement Apartment - 1 bed plus den or 2 bed",
//                 "url": "/v-apartments-condos/city-of-toronto/basement-apartment-1-bed-plus-den-or-2-bed/1623826063",
//                 "price": "$1,950.00",
//                 "distance": "< 9 km",
//                 "location": "Varna Drive and Dorney Court, Toronto",
//                 "description": "Desirable Bathurst and Lawrence Location! Newly renovated basement apartment with side entrance on a quiet street. Two rooms, large bathroom and kitchen. Can be used as a 1 plus living ...",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 56 minutes ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/63/63f5eaff-60c1-4b7b-873c-cc7730e4309d?rule=kijijica-200-jpg",
//                 "id": 35
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.383935,
//                     43.653482
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Condo for Rent near Eaton Centre/Ryerson from Sept 1",
//                 "url": "/v-apartments-condos/city-of-toronto/condo-for-rent-near-eaton-centre-ryerson-from-sept-1/1629405206",
//                 "price": "$2,250.00",
//                 "distance": "Near you",
//                 "location": "Dundas Street East and Jarvis Street, Toronto",
//                 "description": "Beautiful Grid Condo for Rent. Starting Sept 1. In the 6th floor.",
//                 "bedrooms": "Beds: 1 + Den",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/26/26cc933a-81a3-4610-acf2-2a1102b8ab8f?rule=kijijica-200-jpg",
//                 "id": 36
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Newly Renovated 1 Bedroom ~ East York/near DVP",
//                 "url": "/v-apartments-condos/city-of-toronto/newly-renovated-1-bedroom-east-york-near-dvp/1523036055",
//                 "price": "$1,808.00",
//                 "distance": "< 7 km",
//                 "location": "Overlea Boulevard and William Morgan Drive, Toronto",
//                 "description": "71 Thorncliffe Park Drive (East York) Thorncliffe Park Dr. & Overlea Blvd. Monthly rent: Starting from $1808/month Utilities: Heat and water included, hydro extra Parking: $130 per month/indoor or ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/67/67f6f77c-01a5-42f7-b445-38cef9ac9530?rule=kijijica-200-jpg",
//                 "id": 37
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.383935,
//                     43.653482
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "LARGE Fully Renovated 1 Bedroom in heart of Old East York!",
//                 "url": "/v-apartments-condos/city-of-toronto/large-fully-renovated-1-bedroom-in-heart-of-old-east-york/1587433122",
//                 "price": "$1,799.00",
//                 "distance": "< 9 km",
//                 "location": "St Clair Avenue East and Vicross Road, Toronto",
//                 "description": "2893-2897 St. Clair Ave E O'Connor Dr/St. Clair Ave E *Please note that the suite photos in the listing are for illustrative purposes only. Suite finishes may vary by availability and suite type. ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/0e/0ee135dd-aa04-4857-8366-bf8990762317?rule=kijijica-200-jpg",
//                 "id": 38
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom East York (St. Clair & Victoria Park Ave)",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-east-york-st-clair-victoria-park-ave/1627845120",
//                 "price": "$1,803.00",
//                 "distance": "< 9 km",
//                 "location": "St Clair Avenue East and Plaxton Drive, Toronto",
//                 "description": "2892 St. Clair Ave E O'Connor Dr/St. Clair Ave E *Please note that the suite photos in the listing are for illustrative purposes only. Suite finishes may vary by availability and suite type. Monthly ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/d9/d9666028-ffea-4f24-bbd9-8062e0567cda?rule=kijijica-200-jpg",
//                 "id": 39
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3307,
//                     43.6684
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "Bachelor with high end finishes ~Close to O’Connor and St. Clair",
//                 "url": "/v-apartments-condos/city-of-toronto/bachelor-with-high-end-finishes-close-to-o-connor-and-st-clair/1594815398",
//                 "price": "$1,760.00",
//                 "distance": "< 9 km",
//                 "location": " and , Toronto",
//                 "description": "5, 7 & 9 Stag Hill Drive (East York) O'Connor Dr. & St. Clair Ave E. Monthly rent: Starting from $1760/month Utilities: Heat included, hydro and water extra Parking: $100 per month/outdoor To view ...                                                                                                                                                                                                                                                                                    Book your virtual showing now! Please call for more details.",
//                 "bedrooms": "Beds: Bachelor/Studio",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/3f/3fdeda4b-428e-4775-bb40-b9eb87c80d86?rule=kijijica-200-jpg",
//                 "id": 40
//             },
//             "type": "Feature",
//             "geometry": {
//                 "coordinates": [
//                     -79.396072,
//                     43.629591500000004
//                 ],
//                 "type": "Point"
//             }
//         },
//         {
//             "properties": {
//                 "title": "1 Bedroom Apartment -- Newly Renovated!",
//                 "url": "/v-apartments-condos/city-of-toronto/1-bedroom-apartment-newly-renovated/1562405617",
//                 "price": "$1,929.00",
//                 "distance": "< 8 km",
//                 "location": "Main Street and Hamstead Avenue, Toronto",
//                 "description": "327 Chisholm Avenue (East York) Woodbine Avenue & Cosburn Avenue Monthly rent: Starting from $1,929 month Utilities: Heat included, hydro and water extra Parking: $130 per month/indoor or $100 per ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/81/81d51b5b-1ab3-47aa-826d-e5f6634e350f?rule=kijijica-200-jpg",
//                 "id": 41
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -63.381633,
//                     46.423215
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "EAST YORK Reno 1 BR by Broadview",
//                 "url": "/v-apartments-condos/city-of-toronto/east-york-reno-1-br-by-broadview/1626968899",
//                 "price": "$1,900.00",
//                 "distance": "< 5 km",
//                 "location": "Broadview Avenue and Torrens Avenue, Toronto",
//                 "description": "65 Hillside Dr., Toronto Broadview Ave. & OConnor Dr. Monthly rent: Starting from $1900/month Utilities: Heat included, hydro water extra Parking: $103 per month/outdoor To view our property from the ...",
//                 "bedrooms": "Beds: 1",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/04/0409a578-60af-48de-8151-f522c50ea324?rule=kijijica-200-jpg",
//                 "id": 42
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.3561095,
//                     43.6739456
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "2 Bedroom on Quiet Residential Street ~ Brand New Renovations!",
//                 "url": "/v-apartments-condos/city-of-toronto/2-bedroom-on-quiet-residential-street-brand-new-renovations/1619543504",
//                 "price": "$2,494.00",
//                 "distance": "< 9 km",
//                 "location": "O'Connor Drive and Sandra Road, Toronto",
//                 "description": "5, 7 & 9 Stag Hill Drive (East York) O'Connor Dr. & St. Clair Ave E. Monthly rent: Starting from $2494 Utilities: Heat included, hydro and water extra Parking: $100 per month/outdoor Suite Features: ...                                                                                                                                                                                                                                                                                    Book your virtual showing now! Please call for more details.",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/f5/f5e6b858-513d-452d-9476-bc18e5941b10?rule=kijijica-200-jpg",
//                 "id": 43
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.326001,
//                     43.698788
//                 ]
//             }
//         },
//         {
//             "properties": {
//                 "title": "BRAND NEW 2ND FLOOR  APARTMENT FOR RENT 2 BALCONIES",
//                 "url": "/v-apartments-condos/city-of-toronto/brand-new-2nd-floor-apartment-for-rent-2-balconies/1629404442",
//                 "price": "$3,100.00",
//                 "distance": "< 7 km",
//                 "location": "Caledonia Road and Summit Avenue, Toronto",
//                 "description": "BRAND NEW 2ND FLOOR CONTEMPORARY DESIGN- PREMIUM APARTMENT WITH ACCESS TO 2 BALCONIES AT REAR AND FRONT. CURRENTLY IN FINAL STAGES OF CONSTRUCTION WILL BE READY TO RENT BY SEPTEMBER 1 ST!!! A MUST ...",
//                 "bedrooms": "Beds: 2",
//                 "datePosted": "< 2 hours ago",
//                 "mainImage": "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/ff/ff7b7463-bca2-495c-9bf6-3039d8de25ec?rule=kijijica-200-jpg",
//                 "id": 44
//             },
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -79.4597513,
//                     43.6865488
//                 ]
//             }
//         }
//     ]
// }

//SIDE BAR RENTAL CARDS


const RentalsPage = () => {
    const { loading, handleFetch, open, handleOpen, handleClose, data } = useContext(Context)
    const [isActive, setIsActive] = useState(null)

    //MAP
    const mapContainer = useRef(null);
    const map = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15, closeButton: false }))
    const [lng, setLng] = useState(-79.347015);
    const [lat, setLat] = useState(43.651070);
    const [zoom, setZoom] = useState(11.2);


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
                price={currentFeature.properties.price}
                mainImage={currentFeature.properties.mainImage}
                bedrooms={currentFeature.properties.bedrooms}
                datePosted={currentFeature.properties.datePosted}

            />
        )
        popUpRef.current
            .setLngLat(currentFeature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map.current)
    }, [])


    useEffect(() => {
        if (loading) return
        // if (map.current) return; // initialize map only once
        console.log("map initializing")
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/gcoakleyjr/cl6vjuq35000314l2d5mgc07m',
            center: [lng, lat],
            zoom: zoom
        });
    }, [loading]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        console.log("ran1")
        map.current.on('load', () => {
            console.log("ran2")
            map.current.addSource('data', {
                'type': 'geojson',
                'data': data
            });

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

            map.current.on("click", e => {
                const features = map.current.queryRenderedFeatures(e.point, {
                    layers: ["unclustered-point"]
                });
                if (!features.length) return;

                const clickedPoint = features[0];

                createPopUp(clickedPoint)
                flyToRental(clickedPoint)
                setIsActive(clickedPoint.properties.id)

                // if (activeRef[0]) {
                //     activeRef[0].classList.remove('active')
                // }

            })


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
            map.current.addControl(new mapboxgl.NavigationControl(), "top-right");


        });
        // Clean up on unmount
        return () => map.current.remove();
    }, [loading]);



    return (
        <Box component='main' sx={{ height: '100vh', overflow: 'hidden' }}>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant='h2'>
                    {!loading ? 'Up and Running' : 'Loading...'}
                </Typography>
                <Button onClick={handleFetch}>Refresh</Button>
            </Box>

            <Grid container sx={{ height: '100%' }} >
                <Grid item xs={4} md={3} sx={{ height: '100%', overflow: 'scroll' }} >
                    <Cards isActive={isActive} setIsActive={setIsActive} flyToStore={flyToRental} createPopUp={createPopUp} data={data} />
                </Grid>
                <Grid item xs={8} md={9}>
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
                </Grid>
            </Grid>
        </Box>

    )
}

export default RentalsPage