import { useMemo, useState, useRef } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect } from 'react'
import axios from '/lib/axios'

const mapContainerStyle = {
    width: '100%',
    height: '500px',
}

async function getCityCenter(cityId) {
    let resp = await axios.get(`api/cities/${cityId}`)
    return resp.data
}

const RenderMap = props => {
    const mapCenter = useMemo(() => ({ lat: 49.61203, lng: 6.1296 }), [])
    const [markers, setMarkers] = useState([])
    const [locationCenter, setLocationCenter] = useState({})
    const [cityCenter, setCityCenter] = useState([])
    const mapRef = useRef(null)

    //TODO: implement bounds for the zoom fit
    /* const fitBounds = () => {
        const bounds = new window.google.maps.LatLngBounds()
        markers.map(item => {
            bounds.extend(item.position)
            return item.id
        })
        mapRef.current.fitBounds(bounds)
    } */

    //set Markers from event category or theme category
    useEffect(() => {
        if (Object.keys(props.sharedMarkersState).length != 0) {
            setMarkers(Object.entries(props.sharedMarkersState))
        } else {
            setMarkers(
                Object.entries([
                    { name: 'default marker' },
                    { position: mapCenter, label: 'Lux Ville' },
                ]),
            )
        }
    }, [props.sharedMarkersState])

    //get city data to set the center
    useEffect(() => {
        getCityCenter(props.sharedCityIdState).then(result =>
            setCityCenter(result),
        )
    }, [props.sharedCityIdState])
    //Set the map center either on the city center or the location
    useEffect(() => {
        if (Object.keys(props.sharedCenterState).length != 0) {
            setLocationCenter(props.sharedCenterState)
        }
    }, [props.sharedCenterState])

    useEffect(() => {
        if (props.sharedCityIdState > 0) {
            setLocationCenter(JSON.parse(cityCenter.geo))
        } else {
            setLocationCenter(mapCenter)
        }
    }, [cityCenter])

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                zoom={14}
                center={locationCenter}
                mapContainerStyle={mapContainerStyle}>
                {/* ref={mapRef}> */}
                {markers.map((e, i) => {
                    return (
                        <Marker
                            key={i}
                            position={e[1].position}
                            label={e[1].label}
                        />
                    )
                })}
            </GoogleMap>
        </LoadScript>
    )
}

export default RenderMap
