import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
const Context = createContext()

const ContextProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        province: '',
        area: [],
        distance: 25,
        unit: '',
        unitCode: '',
        rooms: '',
        roomCode: '',
        price: [0, 5000]
    })

    const [rentalUrl, setRentalUrl] = useState("")

    const [data, setData] = useState({})
    const [rentalData, setRentalData] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingRental, setLoadingRental] = useState(false)
    const [fetchCount, setFetchCount] = useState(0)
    const [fetchCount2, setFetchCount2] = useState(0)
    const [welcomePage, setWelcomePage] = useState(true)
    const [locationForm, setlocationForm] = useState(false)
    const [filters, setFilters] = useState(false)

    //FILTERS FORM SWITCHING
    function switchToForm() {
        setWelcomePage(false)
        setlocationForm(true)
    }

    function switchBackToForm() {
        setlocationForm(true)
        setFilters(false)
    }

    function switchToFilters() {
        setlocationForm(false)
        setFilters(true)
    }

    //FILTERS MODAL
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        switchToForm()
        switchToFilters()
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    };

    //SIDEBAR STATES
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerOpen = () => {
        setSideBarOpen(true);
    };

    const handleDrawerClose = () => {
        setSideBarOpen(false);
    };

    //BACKEND FETCH
    function handleFetch() {
        setLoading(true)
        setFetchCount(fetchCount + 1)
        console.log(fetchCount)
        setOpen(false)
    }

    function handleRentalFetch() {
        setLoadingRental(true)
        setFetchCount2(prev => prev + 2)
        console.log(fetchCount2)
    }


    function getRentals() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/api',
            params: { formData }
        }
        axios.request(options)
            .then(data => {
                setData(data.data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }

    function getRental() {
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/rental',
            params: { rentalUrl }
        }
        axios.request(options)
            .then(data => {
                setRentalData(data.data)
                setLoadingRental(false)
                console.log(data.data)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {

        if (loading) {
            getRentals()
        }

    }, [fetchCount])

    useEffect(() => {
        console.log('use1')
        if (loadingRental) {
            console.log('use2')
            getRental()
        }
    }, [fetchCount2])

    return (
        <Context.Provider value={{
            formData,
            setFormData,
            data,
            loading,
            handleFetch,
            welcomePage,
            locationForm,
            filters,
            switchToForm,
            switchToFilters,
            switchBackToForm,
            open,
            handleClose,
            handleOpen,
            sideBarOpen,
            handleDrawerOpen,
            handleDrawerClose,
            loadingRental,
            handleRentalFetch,
            setRentalUrl,
            rentalData
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
