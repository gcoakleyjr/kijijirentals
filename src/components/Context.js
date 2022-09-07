import React, { createContext, useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import axios from 'axios'
const Context = createContext()

const ContextProvider = ({ children }) => {
    //MEDIA QUERY
    const theme = useTheme();
    const mediaQuerySm = useMediaQuery(theme.breakpoints.up('sm'));
    const mediaQueryMd = useMediaQuery(theme.breakpoints.up('md'));

    //STATES


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

    const [rentalData, setRentalData] = useState({
        images: [""],
        price: "",
        address: "",
        generalInfo: [""],
        utilities: [""],
        description: [""]
    })
    const [data, setData] = useState(JSON.parse(localStorage.getItem("rentals")) || {})
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
        setSideBarRentalOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
    };

    //SIDEBAR STATES
    const [sideBarRentalOpen, setSideBarRentalOpen] = useState(false);
    const [sideBarRentalListOpen, setSideBarRentalListOpen] = useState(true);

    const handleRentalDrawerOpen = () => {
        setSideBarRentalOpen(true);
    };

    const handleRentalDrawerClose = () => {
        setSideBarRentalOpen(false);
    };

    const handleRentalListDrawerOpen = () => {
        setSideBarRentalListOpen(true);
    };

    const handleRentalListDrawerClose = () => {
        setSideBarRentalListOpen(false);
    };

    const handleRentalListToggle = () => {
        setSideBarRentalListOpen(prev => !prev);
    };

    //BACKEND FETCH
    function handleFetch() {
        setLoading(true)
        setFetchCount(fetchCount + 1)
        setOpen(false)
    }

    function handleRentalFetch() {
        setLoadingRental(true)
        setFetchCount2(prev => prev + 2)
    }

    function handleRentalClick(url) {
        setRentalUrl(url)
        handleRentalDrawerOpen()
        handleRentalFetch()
    }


    function getRentals() {
        const options = {
            method: 'GET',
            url: 'https://dry-oasis-06648.herokuapp.com/api',
            params: { formData }
        }
        axios.request(options)
            .then(data => {
                setData(data.data)
                setLoading(false)
                localStorage.setItem("rentals", JSON.stringify(data.data))
            })
            .catch(error => console.error(error))
    }

    function getRental() {
        const options = {
            method: 'GET',
            url: 'https://dry-oasis-06648.herokuapp.com/rental',
            params: { rentalUrl }
        }
        axios.request(options)
            .then(data => {
                setRentalData(data.data)
                setLoadingRental(false)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        if (loading) {
            getRentals()
        }
    }, [fetchCount])

    useEffect(() => {
        if (loadingRental) {
            getRental()
        }
    }, [fetchCount2])

    return (
        <Context.Provider value={{
            mediaQuerySm,
            mediaQueryMd,
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
            sideBarRentalListOpen,
            handleRentalListDrawerOpen,
            handleRentalListDrawerClose,
            handleRentalListToggle,
            sideBarRentalOpen,
            handleRentalDrawerOpen,
            handleRentalDrawerClose,
            loadingRental,
            handleRentalFetch,
            setRentalUrl,
            rentalData,
            handleRentalClick
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
