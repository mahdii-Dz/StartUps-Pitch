"use client"
import React, { useEffect, useState } from 'react'
import Ping from './Ping'
import { FormatViews } from './FormatViews'
import ViewsSkeleton from './ViewsSkeleton'

function View({ id }) {


    const [views, setViews] = useState(null)

    useEffect(() => {
        const storageKey = `viewCounted-${id}`

        const initFetch = async () => {
            const hasCounted = sessionStorage.getItem(storageKey)
            await fetchViews(hasCounted !== 'true')
            if (!hasCounted) {
                sessionStorage.setItem(storageKey, 'true')
            }
        }

        const fetchViews = async (shouldIncrement = false) => {
            try {
                const url = `/api/views?id=${encodeURIComponent(id)}${shouldIncrement ? '&increment=true' : ''}`
                const response = await fetch(url)

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
                const data = await response.json()
                setViews(data.views)
            } catch (error) {
                console.error('Error fetching views:', error)
            }
        }
        initFetch()

        const intervalID = setInterval(fetchViews, 10000)
        return () => clearInterval(intervalID)
    }, [id])

    if (!views) {
        return <ViewsSkeleton />
    }

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>
            <p className='view-text'>
                <span className='font-black'><FormatViews views={views} /></span>
            </p>
        </div>
    )
}

export default View