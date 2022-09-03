if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


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
    const { area, distance, unit, unitCode, rooms, roomCode, price } = searchParamaters
    const city = area[1].toLowerCase().replace(/_/g, "-")
    const unitString = unit ? unit.length > 1 ? unit.join("__") : unit[0] : ""
    const roomString = rooms ? rooms.length > 1 ? rooms.join("__") : rooms[0] : ""
    const priceMin = price[0] > 0 ? price[0] : ""
    const priceMax = price[1] < 5000 ? price[1] : ""


    const url = `${kijiji}/b-apartments-condos/${city}${unitString || roomString ? "/" : ""}${roomString}${roomString && unitString ? "-" : ""}${unitString}/c37l${area[0]}${roomString ? roomCode : ""}${unit ? unitCode : ""}?radius=${distance}${priceMin || priceMax ? "&price=" : ""}${priceMin}${priceMin || priceMax ? "__" : ""}${priceMax}`


    const getData = async () => {
        try {
            const rentals = {
                type: 'FeatureCollection',
                features: []
            }
            const response = await axios.get(url)

            const html = response.data
            const $ = cheerio.load(html)

            $(".search-item").each(function () {
                //GET URL
                const url = $(this).find(".title:last").attr('href')

                //GET OTHER RENTAL INFORMATION
                const title = $(this).find(".title:last").text().trim().replace(regex, '')
                const price = $(this).find(".price").text().trim().replace(regex, '')
                const distance = $(this).find(".distance").text().trim().replace(regex, '')
                const description = $(this).find(".description").text().trim().replace(regex, '')
                const bedrooms = $(this).find(".bedrooms").text().trim().replace(regex, '').replace(/\s+/g, " ")
                const location1 = $(this).find(".intersection:first").text().trim().replace(regex, '')
                const location2 = $(this).find(".intersection:last").text().trim().replace(regex, '')
                const location = `${location1} and ${location2}, ${area[1].toLowerCase().replace(/_/g, " ")}`
                const datePosted = $(this).find(".date-posted").text()
                const mainImage = $(this).find(".image img").attr('data-src')

                rentals.features.push({
                    properties: {
                        title,
                        url,
                        price,
                        distance,
                        location,
                        description,
                        bedrooms,
                        datePosted,
                        mainImage
                    },
                    type: "Feature"
                })
            })

            const areaCoordinates = await geocoder.forwardGeocode({
                query: area[1].toLowerCase().replace(/_/g, " "),
                limit: 1,
                countries: ['ca']
            }).send()

            rentals.cityCoordinates = areaCoordinates.body.features[0].geometry
            const lat = areaCoordinates.body.features[0].geometry.coordinates[0]
            const lng = areaCoordinates.body.features[0].geometry.coordinates[1]
            await Promise.all(rentals.features.map(async (item, i) => {
                const geometry = await geocoder.forwardGeocode({
                    query: item.properties.location,
                    limit: 1,
                    countries: ['ca'],
                    proximity: [lat, lng]
                }).send()
                if (geometry.body.features.length > 0) {
                    item.geometry = geometry.body.features[0].geometry
                    item.properties.id = i
                } else {
                    item.geometry = ''
                }
            }))
            return rentals

        } catch (err) {
            console.log(err)
        }
    }
    const data = await getData()
    res.json(data)
    // res.json("hi")

})


app.get('/rental', async (req, res) => {
    const { rentalUrl } = req.query


    const getData = async () => {
        try {
            const rental = {
                images: [],
                generalInfo: [],
                description: [],
                utilities: [],
                overview: []
            }
            const response = await axios.get(`${kijiji}${rentalUrl}`)

            const html = response.data
            const $ = cheerio.load(html)

            rental.url = `${kijiji}${rentalUrl}`
            rental.title = $('h1').text()
            rental.address = $('.address-3617944557:first').text()
            rental.price = $('.priceWrapper-1165431705').find('span:first').text()
            rental.time = $('.datePosted-383942873').find('time:first').text()
            rental.description2 = $('.descriptionContainer-231909819').find('div').text()
            $('.image-3484370594').each(function () {
                rental.images.push($(this).attr('src'))
            })
            $('.noLabelValue-3861810455').each(function () {
                rental.generalInfo.push($(this).text())
            })
            $('.descriptionContainer-231909819').find('p').each(function () {
                rental.description.push($(this).text())
            })
            $('.available-731611581').each(function () {
                rental.utilities.push($(this).text())
            })
            $('.twoLinesValue-2815147826').each(function () {
                rental.overview.push($(this).text())
            })


            return rental

        } catch (err) {
            console.log(err)
        }
    }
    const data = await getData()
    res.json(data)

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



