import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { setUserGeo } from "../redux/actions";

export const useGeo = () => {

    const dispatch = useDispatch();

    const [geo, setGeo] = useState({
        latitude: '',
        longitude: '',
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setGeo({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                dispatch(setUserGeo(geo))
            },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
            }
        )
    }, [])


    return {
        latitude: geo.latitude,
        longitude: geo.longitude,
    }

}