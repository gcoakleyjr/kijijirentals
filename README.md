# Kijiji Rental Mapper
A fullstack application developed using React.js and Material UI for a high-fidelity UX/UI design and Node.js and Express.js server to create an API used to fetch rental information for a client.
 
**Link to project:** https://kijijimapper.netlify.app/

![kijijigif2](https://user-images.githubusercontent.com/95830133/189929407-fe4388e3-d7e9-4129-9d06-a482a002ec1f.gif)

 
## How It's Made:
 
**Tech used:** React, Node, Express, CSS, Material UI
 
Kijiji is so great in many ways, you can find any and everything you want on there, except when it comes to rentals. Especially when you are moving to a different city or area, you just want to be able to see where a rental is automatically, without having to click into each one. Thus, the idea for Kijiji Rental Mapper was born.
 
On the backend, Node and Express along with Cheerio are used to source through information from Kijiji based on whatever url is fed into the fetch from the front end. Location data is derived from the intersections that the ad states, which is then turned into LAT and LONG and compiled together with all the other information such as title, description, price, etc into an object and sent over as JSON.
 
The front end user experience starts with a welcome page route that fills in form data of where and what you want to search using React and Material UI for some initial styling. The different components are animated in and out using React Spring, and the information compiled to be sent over has particular codes that are used in Kijiji query requests that have to be sent over. Once the information is received from the backend, you are routed to the map page, where MapBoxGL was used to place all the markers of the rentals, centering on the city chosen. This was particularly tricky because Mapbox documents are generally written for vanilla javascript, and had to refracture a few things to work in React useEffect. From there the goal was to create a seamless user interface to allow users to easily search for rentals on the map.
 
## Optimizations


The trickiest yet most important was getting the location data. When searching for rentals on Kijiji, you are given just the intersection of where the rental is located unless you click into each individual ad where a more accurate location is given. I tested out two versions.
 
The first being to use that general intersection location data, parsing through each ad and generating a lat and long.
 
The second being to compile an array of urls to fetch from in a Promise.All and retrieve a more accurate location data from each individual ad page.
 
For proof of concept and speed, I decided to use the first version.
 
As the app develops, a plan to use MongoDB to cache the rental data from the initial location check, allowing the data to exist and be filtered through from the database rather than a fetch request, allowing for a more speedy and reactive app.
 
Another tricky part was the number of times the Map would generate refreshes from react, really slowing down the speed every time you moved the map or clicked somewhere. This was a great place to use useCallback hooks and React Memo to allow function components to run only once, greatly increasing the app performance.
 
 
## Lessons Learned:
 
This project was generally quite a fun once to make. I got to begin the steps of solving a user-experience issue that I saw and wanted to make better. This was a great project to continue to develop my React and problem solving skills as every step of the process, I encountered something new and unexpected that I had to solve for along with staying up all night reading docs figuring out how to get something to work (I'm looking at you Mapbox react custom markers!)
