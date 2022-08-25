if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const locations = require('./src/utils/locations')

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require("path")
const cors = require('cors')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })


const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3001

const kijiji = 'https://www.kijiji.ca'


details = []
const regex = /(\r\n|\n|\r)/gm
// app.use(express.json())


app.get('/api', async (req, res) => {
    const { formData } = req.query
    const searchParamaters = JSON.parse(formData)
    const { province, area, distance, unit, unitCode, rooms, roomCade, price } = searchParamaters
    const city = area[1].toLowerCase().replace(/_/g, "-")
    const unitString = unit ? unit.length > 1 ? "/" + unit.join("__") : "/" + unit[0] : ""
    console.log(searchParamaters)
    console.log(unitString)


    const url = `${kijiji}/b-apartments-condos/${city}${unitString}/c37l${area[0]}${unit ? unitCode : ""}?radius=${distance}`
    console.log(url)

    // const getData = async () => {
    //     try {
    //         const rentals = {
    //             type: 'FeatureCollection',
    //             features: []
    //         }
    //         const response = await axios.get(`${kijiji}/b-apartments-condos/city-of-toronto/c37l1700273?radius=10.0`)

    //         const html = response.data
    //         const $ = cheerio.load(html)

    //         $(".search-item").each(function () {
    //             //GET URL
    //             const url = $(this).find(".title:last").attr('href')

    //             //GET OTHER RENTAL INFORMATION
    //             const title = $(this).find(".title:last").text().trim().replace(regex, '')
    //             const price = $(this).find(".price").text().trim().replace(regex, '')
    //             const distance = $(this).find(".distance").text().trim().replace(regex, '')
    //             const description = $(this).find(".description").text().trim().replace(regex, '')
    //             const bedrooms = $(this).find(".bedrooms").text().trim().replace(regex, '').replace(/\s+/g, " ")
    //             const location1 = $(this).find(".intersection:first").text().trim().replace(regex, '')
    //             const location2 = $(this).find(".intersection:last").text().trim().replace(regex, '')
    //             const location = `${location1} and ${location2}, Toronto`
    //             const datePosted = $(this).find(".date-posted").text()
    //             const mainImage = $(this).find(".image img").attr('data-src')

    //             rentals.features.push({
    //                 properties: {
    //                     title,
    //                     url,
    //                     price,
    //                     distance,
    //                     location,
    //                     description,
    //                     bedrooms,
    //                     datePosted,
    //                     mainImage
    //                 },
    //                 type: "Feature"
    //             })
    //         })


    //         await Promise.all(rentals.features.map(async (item, i) => {
    //             const geometry = await geocoder.forwardGeocode({
    //                 query: item.properties.location,
    //                 limit: 1,
    //                 countries: ['ca'],
    //                 proximity: [-79.347015, 43.651070]
    //             }).send()
    //             if (geometry.body.features.length > 0) {
    //                 item.geometry = geometry.body.features[0].geometry
    //                 item.properties.id = i
    //             } else {
    //                 item.geometry = ''
    //             }
    //         }))
    //         return rentals

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    // const data = await getData()
    // res.json(data)
    res.json("hi")

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



