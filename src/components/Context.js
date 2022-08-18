import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
const Context = createContext()

const ContextProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        province: '',
        area: '',
        distance: 25,
        unit: '',
        unitCode: '',
        rooms: '',
        roomCode: '',
        price: [0, 5000]
    })

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [fetchCount, setFetchCount] = useState(0)


    function handleFetch() {
        setLoading(true)
        setFetchCount(fetchCount + 1)
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

    useEffect(() => {
        if (loading) {
            getRentals()
        }

    }, [fetchCount])

    return (
        <Context.Provider value={{ formData, setFormData, data, loading, handleFetch }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
